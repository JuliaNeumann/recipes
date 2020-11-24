from django.db import models

class Recipe(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    num_portions = models.IntegerField()
    amount = models.FloatField()
    unit = models.CharField(max_length=500)

    def __str__(self):
        return self.name