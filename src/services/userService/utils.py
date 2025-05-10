from database import get_db

def get_user(email: str):
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    return dict(user) if user else None

def check_user_exists(email: str):
    return get_user(email) is not None

def check_friendship_exists(email_1: str, email_2: str):
    db = get_db()
    result = db.execute(
        "SELECT * FROM friendships WHERE email_1 = ? AND email_2 = ?",
        (email_1, email_2)
    ).fetchall()
    return len(result) > 0
