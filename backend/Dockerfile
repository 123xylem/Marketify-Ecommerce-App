# # Stage 1: Build Python dependencies and collect static files
# FROM python:3.12-slim AS build

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     libmagic1 \
#     gcc \
#     zlib1g-dev \
#     && apt-get clean

# # Set the working directory
# WORKDIR /app

# # Debug: Current working directory
# RUN echo "Debug: Current working directory is " $(pwd)

# # Copy requirements into the container
# COPY requirements.txt /app

# # Install Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt
# RUN pip show gunicorn || echo "Gunicorn not installed"
# # Copy backend code
# COPY . /app

# # Collect static files (optional)
# # RUN python manage.py collectstatic --noinput
# ENV SKIP_COLLECTSTATIC=1

# # Stage 2: Production with NGINX and Gunicorn
# FROM python:3.12-slim AS production
# # ENTRYPOINT []
# WORKDIR /app


# # Install dependencies
# # RUN apk add --no-cache python3 py3-pip

# # Copy NGINX configuration
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# # Copy application code from build stage
# COPY --from=build /app /app/
# COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
# COPY --from=build /usr/local/bin /usr/local/bin
# RUN   ls -al /usr/local/lib/ &&  ls -al /usr/local/lib/python3.12/
# RUN chmod +x /usr/local/bin/gunicorn

# ENV PATH="/usr/local/bin:$PATH"
# RUN echo $PATH 
# # Expose port for NGINX
# EXPOSE 80

# # Debug: List files in the working directory
# RUN echo "Debug: Files in the working directory:" && ls -al /app

# # Start the app with Gunicorn and NGINX
# CMD ["sh", "-c", "which sh & ls -l $(which sh) & ls -l /usr/local/bin & file /usr/local/bin/gunicorn & echo $PATH & pip3 list & pip3 show django & /usr/local/bin/gunicorn base.wsgi:application --bind 0.0.0.0:8000 --workers 3 & nginx -g 'daemon off;'"]

FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libmagic1 \
    gcc \
    zlib1g-dev \
    nginx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y supervisor

# Set the working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Collect static files (if needed)
ENV SKIP_COLLECTSTATIC=1
# Uncomment the following line if you want to collect static files
# RUN python manage.py collectstatic --noinput

# Copy NGINX configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Ensure gunicorn is executable (just in case)
RUN chmod +x /usr/local/bin/gunicorn

# Expose port for the application
EXPOSE 8000

# Default command to run gunicorn and nginx
# CMD ["sh", "-c", "gunicorn base.wsgi:application --bind 0.0.0.0:8000 --workers 3 & nginx -g 'daemon off;'"]
# CMD ["sh", "-c", "echo 'hi'"]
# COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["supervisord", "-c", "/app/supervisord.conf"]
