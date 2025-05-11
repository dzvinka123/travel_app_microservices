FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8005

CMD ["bash", "-c", "uvicorn main:app --host 0.0.0.0 --port 8005 --reload & python worker.py"]
