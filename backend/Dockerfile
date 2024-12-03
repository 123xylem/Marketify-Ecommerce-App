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

# CMD ["supervisord", "-c", "/app/supervisord.conf"] 
CMD ["sh", "-c", "supervisord -c /app/supervisord.conf && python manage.py collectstatic"]
