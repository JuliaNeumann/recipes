"""
Recipe Model Module
"""

class Recipe:
    """
    Main Recipe Data Class
    """

    def __init__(self, title: str, ingredients: list, description: str, categories: list = None):
        self.title = title
        self.ingredients = ingredients
        self.description = description
        self.categories = categories if categories else []
