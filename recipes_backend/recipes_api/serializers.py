from rest_framework import serializers

from .models import Recipe, Ingredient

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description')

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'recipe', 'name', 'num_portions', 'amount', 'unit')