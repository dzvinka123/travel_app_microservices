from fastapi import FastAPI, HTTPException, Query
from database import get_db, init_db
from schemas import UserIn, UserOut, LoginRequest, FriendRequest
from utils import get_user, check_user_exists, check_friendship_exists
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/users", response_model=list[UserOut])
def list_users():
    db = get_db()
    users = db.execute("SELECT email, name FROM users").fetchall()
    return [dict(user) for user in users]

@app.get("/get-user", response_model=UserOut)
def get_user_by_email(email: str = Query(...)):
    user = get_user(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"email": user["email"], "name": user["name"], "exists": True}

@app.post("/register")
def register(user: UserIn):
    if check_user_exists(user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    db = get_db()
    db.execute("INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
               (user.email, user.password, user.name))
    db.commit()
    return {"success": True, "name": user.name, "email": user.email}

@app.post("/login")
def login(data: LoginRequest):
    user = get_user(data.email)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "name": user["name"], "email": user["email"]}

@app.post("/add-friend")
def add_friend(data: FriendRequest):
    if check_friendship_exists(data.email_1, data.email_2):
        raise HTTPException(status_code=400, detail="Already friends")
    db = get_db()
    db.execute("INSERT INTO friendships (email_1, email_2) VALUES (?, ?)",
               (data.email_1, data.email_2))
    db.commit()
    return {"success": True}

@app.get("/friends", response_model=list[UserOut])
def get_friends(email: str = Query(...)):
    db = get_db()
    rows = db.execute("""
        SELECT u.email, u.name FROM users u
        JOIN friendships f ON f.email_2 = u.email
        WHERE f.email_1 = ?
    """, (email,)).fetchall()
    return [dict(row) for row in rows]