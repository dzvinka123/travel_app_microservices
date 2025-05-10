from pydantic import BaseModel

class UserIn(BaseModel):
    email: str
    password: str
    name: str

class UserOut(BaseModel):
    email: str
    name: str
    exists: bool

class LoginRequest(BaseModel):
    email: str
    password: str

class FriendRequest(BaseModel):
    email_1: str
    email_2: str
