# WINP - Recipes

Application for storing and managing recipes.

## development

Start database:
```$ docker-compose up```

Activate virtual environment (uses a subshell):
```$ pipenv shell```

Run unit tests  (in recipes_backend/):
```$ ./manage.py test```

Start django server (in recipes_backend/):
```$ ./manage.py runserver```