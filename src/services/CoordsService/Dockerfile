# Step 1: Use an official Python image from the Docker Hub
FROM python:3.9-slim

# Step 2: Set the working directory in the container
WORKDIR /src/services

# Step 3: Copy the current directory contents (including app files) into the container at /app
COPY . /src/services
# Step 4: Install dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Expose the port that the Flask app will run on
EXPOSE 8002

# Step 6: Set environment variables, such as Flask environment
ENV FLASK_APP=CoordsService/CoordsService.py
ENV FLASK_RUN_PORT=8002
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

# Step 7: Define the command to run when the container starts
# CMD ["flask", "run", "--host", "0.0.0.0"]


CMD ["flask", "run"]