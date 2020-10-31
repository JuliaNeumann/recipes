from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=250)
    num_portions = models.IntegerField()
    amount = models.FloatField()
    unit = models.CharField(max_length=500)

    def __str__(self):
        return self.name
