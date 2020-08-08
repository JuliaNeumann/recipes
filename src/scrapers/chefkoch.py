"""
Chefkoch Scraper - methods for retrieving recipe data from chefkoch.de
"""

import re
import requests


def get_recipe(url):
    """
    Main method: retrieve Recipe from the given chefkoch url
    """
    if is_correct_url(url):
        result = requests.get(url).text
        return parse_html_to_recipe(result)
    return None

def is_correct_url(url):
    """
    Checks if the given url is a valid chefkoch url
    """
    return re.search(r"^https://www.chefkoch.de/rezepte/\d+/[\w\-]+\.html$", url) is not None

def parse_html_to_recipe(html):
    """
    Parses the given html of a chefkock website to a Recipe object
    """
    pass
