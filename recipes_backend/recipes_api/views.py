from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from recipes_scrapers.scrapers import Chefkoch

from .serializers import RecipeSerializer, IngredientSerializer, PlanSerializer
from .models import Recipe, Ingredient, Plan

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('title')
    serializer_class = RecipeSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all().order_by('created')
    serializer_class = PlanSerializer

class ScrapeViewSet(viewsets.ViewSet):
    def list(self, request):
        scraper = Chefkoch() if request.query_params.get("scraper") == "chefkoch" else None
        url = request.query_params.get("url")
        if scraper and url:
            recipe = scraper.get_recipe(url)
            ingredients = [IngredientSerializer(
                                Ingredient(name=ingredient.name, num_portions=ingredient.num_portions, amount=ingredient.amount, unit= ingredient.unit)
                            ).data for ingredient in recipe.ingredients]
            recipe_model = Recipe(title=recipe.title, description=recipe.description, url=url)
            response = Response({"recipe": RecipeSerializer(recipe_model).data, "ingredients": ingredients}, status=status.HTTP_200_OK)
        else:
            response = Response({"error": "You must provide a valid scraper and url."}, status=status.HTTP_404_NOT_FOUND)
        return response
        