from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from database import travel_cards, user_card, todo_list, db
from schemas import TravelCardIn, TodoUpdate, TodoCreate
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.exception_handlers import request_validation_exception_handler 
from pymongo.errors import PyMongoError
import uvicorn

from rq import Queue
from redis import Redis
from tasks import add_travel_card_task, add_task_task, update_task_state_task

app = FastAPI()
redis_conn = Redis(host="redis", port=6379)
q = Queue(connection=redis_conn, is_async=True, default_timeout=500, result_ttl=0)

@app.middleware("http")
async def log_request_body(request: Request, call_next):
    if request.url.path == "/add-travel-card":
        body = await request.body()
        print("Incoming raw body:", body.decode())
    response = await call_next(request)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print("Validation error:", exc.errors())
    return JSONResponse(
        status_code=422,
        content={"success": False, "message": "Validation failed", "errors": exc.errors()},
    )

@app.get("/mongo-status")
def mongo_status():
    try:
        status = db.client.admin.command("replSetGetStatus")
        my_state = status["myState"]
        state_map = {
            1: "PRIMARY",
            2: "SECONDARY",
            0: "STARTUP",
            3: "RECOVERING",
            5: "STARTUP2",
            6: "UNKNOWN",
            7: "ARBITER",
            8: "DOWN",
            9: "ROLLBACK",
            10: "REMOVED"
        }
        return {
            "success": True,
            "state": my_state,
            "state_label": state_map.get(my_state, "UNKNOWN"),
            "members": [
                {
                    "name": member["name"],
                    "stateStr": member["stateStr"],
                    "health": member["health"]
                }
                for member in status["members"]
            ]
        }
    except PyMongoError as e:
        return {"success": False, "message": str(e)}

@app.post("/add-travel-card")
def add_travel_card(card: TravelCardIn):
    job = q.enqueue(add_travel_card_task, card.dict())
    return {"success": True, "message": "Travel card enqueued", "job_id": job.id}
    
#     if not card.from_ or not card.to or not card.start_date or not card.end_date:
#         return {
#             "success": False,
#             "message": "All fields are required and lists must have at least one entry"
#         }

#     # insert travel card
#     result = travel_cards.insert_one({
#         "from": card.from_,
#         "to": card.to,
#         "start_date": card.start_date,
#         "end_date": card.end_date,
#         "description": card.description,
#         "active": card.active
#     })

#     card_id = str(result.inserted_id)

#     # insert user-card relations
#     if card.emails:
#         user_card.insert_many([
#             {"user_email": email, "card_id": card_id} for email in card.emails
#         ])

# # insert tasks
#     if card.tasks:
#         todo_list.insert_many([
#             {"task": t, "done": False, "card_id": card_id} for t in card.tasks
#         ])

#     return {
#         "success": True,
#         "message": "Travel card, user associations, and tasks added successfully",
#         "cardId": card_id
#     }

@app.get("/user-travel-cards")
def get_user_travel_cards(email: str):
    if not email:
        return {"success": False, "message": "Email is required"}

    # find cards for this user
    user_cards = list(user_card.find({"user_email": email}))
    card_ids = [uc["card_id"] for uc in user_cards]

    if not card_ids:
        return {"success": True, "travelCards": []}

    cards = list(travel_cards.find({"_id": {"$in": [ObjectId(cid) for cid in card_ids]}}))

    # fetch todos
    todos = list(todo_list.find({"card_id": {"$in": card_ids}}))

    # fetch emails
    email_links = list(user_card.find({"card_id": {"$in": card_ids}}))

    # build response
    def enrich(card):
        cid = str(card["_id"])
        return {
            "id": cid,
            "from": card["from"],
            "to": card["to"],
            "start_date": card["start_date"],
            "end_date": card["end_date"],
            "description": card.get("description", ""),
            "active": card["active"],
            "todoList": [
                {
                    "id": str(t["_id"]),
                    "task": t["task"],
                    "done": t["done"],
                    "card_id": t["card_id"]
                }
                for t in todos if t["card_id"] == cid
            ],
            "emails": [
                {
                    "user_email": e["user_email"],
                    "card_id": e["card_id"]
                }
                for e in email_links if e["card_id"] == cid
            ]
        }

    return {"success": True, "travelCards": [enrich(c) for c in cards]}

@app.put("/todo-list")
def update_task_state(update: TodoUpdate):
    job = q.enqueue(update_task_state_task, update.dict())
    return {"success": True, "message": "Task update enqueued"}
    # result = todo_list.update_one(
    #     {"_id": ObjectId(update.taskId)},
    #     {"$set": {"done": update.done}}
    # )
    # if result.matched_count == 0:
    #     return {"success": False, "message": "Task not found"}
    # return {"success": True, "message": "Task state updated successfully"}

@app.post("/todo-list")
def add_task(data: TodoCreate):
    job = q.enqueue(add_task_task, data.dict())
    return {"success": True, "message": "Task add enqueued"}
    # if not data.task or not data.card_id:
    #     return {"success": False, "message": "Missing required fields"}

    # result = todo_list.insert_one({
    #     "task": data.task,
    #     "done": data.done,
    #     "card_id": data.card_id
    # })

    # return {
    #     "success": True,
    #     "message": "Task added successfully",
    #     "taskId": str(result.inserted_id)
    # }