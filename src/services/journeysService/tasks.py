from database import travel_cards, user_card, todo_list
from bson import ObjectId


def add_travel_card_task(card: dict):
    result = travel_cards.insert_one(
        {
            "from": card["from_"],
            "to": card["to"],
            "start_date": card["start_date"],
            "end_date": card["end_date"],
            "description": card["description"],
            "active": card["active"],
        }
    )
    card_id = str(result.inserted_id)

    if card["emails"]:
        user_card.insert_many(
            [{"user_email": email, "card_id": card_id} for email in card["emails"]]
        )
    if card["tasks"]:
        todo_list.insert_many(
            [
                {"task": task, "done": False, "card_id": card_id}
                for task in card["tasks"]
            ]
        )
    return card_id


def add_task_task(data: dict):
    result = todo_list.insert_one(
        {"task": data["task"], "done": data["done"], "card_id": data["card_id"]}
    )
    return str(result.inserted_id)


def update_task_state_task(update: dict):
    result = todo_list.update_one(
        {"_id": ObjectId(update["taskId"])}, {"$set": {"done": update["done"]}}
    )
    return result.modified_count
