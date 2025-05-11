from rq import Worker, Queue
from redis import Redis
from rq.connections import Connection  # <-- fix

import tasks  # ensure this is imported so job functions are found

redis_conn = Redis(host="redis", port=6379)  
queue = Queue('default', connection=redis_conn)

with Connection(redis_conn):
    worker = Worker(['default'])
    worker.work()
