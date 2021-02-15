from rest_framework import serializers
from rest_framework.fields import ListField

from recipes_api.models import Recipe, Ingredient, Plan, Meal


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'num_portions', 'amount', 'unit')

class RecipeSerializer(serializers.ModelSerializer):
    ingredient_set = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'url', 'confirmed', 'ingredient_set')

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredient_set')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe

class PlanSerializer(serializers.ModelSerializer):
    recipes = ListField
    class Meta:
        model = Plan
        fields = ('id', 'created', 'comment', 'recipes')
        depth = 1

    def create(self, validated_data):
        recipes = self.initial_data.pop('recipes')
        plan = Plan.objects.create(comment = validated_data['comment'])
        for recipes_id in recipes:
            recipe = Recipe.objects.get(pk=recipes_id)
            plan.recipes.add(recipe)
        plan.save()
        return plan