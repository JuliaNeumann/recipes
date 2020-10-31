from django.shortcuts import render
from rest_framework import viewsets

from .serializers import IngredientSerializer
from .models import Ingredient


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer