import sqlite3
from pymongo import MongoClient

# === CLEAR USERS DB (SQLite) ===
def clear_users_db():
    conn = sqlite3.connect("userService/users.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM friendships")
    cursor.execute("DELETE FROM users")
    conn.commit()
    conn.close()
    print("SQLite users.db cleared")

# === CLEAR JOURNEYS DB (MongoDB) ===
def clear_journeys_db():
    client = MongoClient("mongodb://localhost:27017")
    db = client["journeys_db"]
    db["travel_cards"].delete_many({})
    db["todo_list"].delete_many({})
    db["user_card"].delete_many({})
    print("MongoDB journeys_db cleared")

if __name__ == "__main__":
    clear_users_db()
    clear_journeys_db()
