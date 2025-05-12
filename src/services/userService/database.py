import sqlite3
from pathlib import Path

DB_PATH = "users.db"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create users table if it doesn't exist
    cursor.execute(
        """
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        password TEXT,
        name TEXT
    )"""
    )

    # Create friendships table if it doesn't exist
    cursor.execute(
        """
    CREATE TABLE IF NOT EXISTS friendships (
        email_1 TEXT,
        email_2 TEXT
    )"""
    )

    conn.commit()
    conn.close()


def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn
