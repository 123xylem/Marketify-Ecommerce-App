# Entry Build point for deployment
web: cd backend && python manage.py migrate && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000
frontend: cd frontend && npm install && npm run build
