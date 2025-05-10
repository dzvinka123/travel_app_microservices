from rq import Worker, Queue
from redis import Redis
from rq.connections import Connection  # <-- fix

import tasks  # ensure this is imported so job functions are found

redis_conn = Redis()
with Connection(redis_conn):
    worker = Worker(['default'])
    worker.work()
