from pydantic import BaseModel
from typing import List, Optional

from pydantic import BaseModel, Field, validator
from typing import List, Optional

class TravelCardIn(BaseModel):
    from_: str
    to: str
    start_date: str
    end_date: str
    description: Optional[str] = ""
    active: bool
    emails: List[str]
    tasks: List[str]

    @validator("emails", pre=True)
    def filter_invalid_emails(cls, v):
        return [email for email in v if isinstance(email, str) and email.strip()]

    @validator("tasks", pre=True)
    def filter_invalid_tasks(cls, v):
        return [task for task in v if isinstance(task, str) and task.strip()]


class TodoUpdate(BaseModel):
    taskId: str
    done: bool

class TodoCreate(BaseModel):
    task: str
    done: bool
    card_id: str
