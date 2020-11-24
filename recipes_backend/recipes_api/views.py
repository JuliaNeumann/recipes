from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from recipes_scrapers.scrapers import Chefkoch

from .serializers import RecipeSerializer, IngredientSerializer
from .models import Recipe, Ingredient

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('title')
    serializer_class = RecipeSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer

@api_view()
def scrape_view(request):
    chefkoch = Chefkoch()
    recipe = chefkoch.get_recipe("https://www.chefkoch.de/rezepte/2309381368530629/Papas-Huehnerschlegel-mit-Curryreis.html")
    recipe_model = Recipe(title=recipe.title, description=recipe.description)
    response = Response(RecipeSerializer(recipe_model).data, status=status.HTTP_200_OK)
    return response
        