# Stage 1: Build Python dependencies and collect static files
FROM python:3.12-slim AS build

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
WORKDIR /app

# Copy Python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Collect static files
# RUN python manage.py collectstatic --noinput
ENV SKIP_COLLECTSTATIC=1


# Stage 2: Production with NGINX and Gunicorn
FROM nginx:alpine AS production

# Install dependencies
RUN apk add --no-cache python3 py3-pip

# Set environment variables for Gunicorn
ENV GUNICORN_CMD_ARGS="--bind 0.0.0.0:8000 --workers 3"

# Copy NGINX configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy static files from build stage
COPY --from=build /app/staticfiles /static

# Copy application code from build stage
COPY --from=build /app /app

# Expose port for NGINX
EXPOSE 80

# Start Gunicorn and NGINX

# CMD ["sh", "-c", "gunicorn base.wsgi:application & nginx -g 'daemon off;'"]
