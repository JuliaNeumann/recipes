from rest_framework import serializers
from rest_framework.fields import ListField

from api.models import Recipe, Ingredient, Plan, Meal


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

    def update(self, recipe, validated_data):
        recipe.confirmed = validated_data.get('confirmed', recipe.confirmed)
        recipe.title = validated_data.get('title', recipe.title)
        recipe.description = validated_data.get('description', recipe.description)
        recipe.url = validated_data.get('url', recipe.url)
        # TODO: update ingredients
        recipe.save()
        return recipe


class MealSerializer(serializers.HyperlinkedModelSerializer):
    recipe_id = serializers.ReadOnlyField(source='recipe.id')
    title = serializers.ReadOnlyField(source='recipe.title')
    class Meta:
        model = Meal
        fields = ('id', 'title', 'recipe_id', 'done')

class PlanSerializer(serializers.ModelSerializer):
    recipes = ListField
    meal_set = MealSerializer(many=True)

    class Meta:
        model = Plan
        fields = ('id', 'created', 'comment', 'recipes', 'meal_set')
        depth = 1

    def create(self, validated_data):
        recipes = self.initial_data.pop('recipes')
        plan = Plan.objects.create(comment = validated_data['comment'])
        for recipes_id in recipes:
            recipe = Recipe.objects.get(pk=recipes_id)
            plan.recipes.add(recipe)
        plan.save()
        return plan
