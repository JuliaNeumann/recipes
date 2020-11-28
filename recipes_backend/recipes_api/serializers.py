from rest_framework import serializers

from recipes_api.models import Recipe, Ingredient


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'recipe', 'name', 'num_portions', 'amount', 'unit')

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'ingredients')

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe