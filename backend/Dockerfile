FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libmagic1 \
    gcc \
    zlib1g-dev \
    && apt-get clean

# Set the working directory
WORKDIR /app/backend

# Copy the backend requirements
COPY ./requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory
COPY . .

# # Command to run the backend
# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
