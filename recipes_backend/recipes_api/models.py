import datetime
from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    url = models.CharField(max_length=1000, blank=True, default='')
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    num_portions = models.IntegerField(blank=True, default=0)
    amount = models.FloatField()
    unit = models.CharField(max_length=500, blank=True, default='')

    def __str__(self):
        return self.name

class Plan(models.Model):
    created = models.DateField(auto_now_add=True)
    comment = models.TextField(blank=True)
    recipes = models.ManyToManyField(Recipe, through='Meal')

class Meal(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.PROTECT)
    done = models.BooleanField(default=False)