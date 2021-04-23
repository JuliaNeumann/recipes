release: python recipes_backend/manage.py migrate
web: gunicorn --chdir recipes_backend main.wsgi --log-file -