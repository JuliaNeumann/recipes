from rest_framework import serializers

from recipes_api.models import Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'num_portions', 'amount', 'unit')

class RecipeSerializer(serializers.ModelSerializer):
    ingredient_set = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'ingredient_set')

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredient_set')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe