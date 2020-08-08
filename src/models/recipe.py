"""
Recipe Model Module
"""

class Recipe:
    """
    Main Recipe Data Class
    """

    def __init__(self, title, ingredients, description, categories=None):
        self.title = title
        self.ingredients = ingredients
        self.description = description
        self.categories = categories if categories else []
