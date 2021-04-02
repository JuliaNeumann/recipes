import abc

from ..models import Recipe

class ScraperInterface(metaclass=abc.ABCMeta):
    """
    Formal Scraper Interface - Must be implemented by all classes to scrape different web sources for recipes
    """

    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, 'get_recipe') and
                callable(subclass.get_recipe) and
                hasattr(subclass, 'is_correct_url') and
                callable(subclass.is_correct_url) or
                NotImplemented)

    @abc.abstractmethod
    def get_recipe(self, url: str) -> Recipe:
        """
        Main method: retrieve `Recipe` from the given url
        """
        raise NotImplementedError

    @abc.abstractmethod
    def is_correct_url(self, url: str) -> bool:
        """
        Checks if given `url` is a valid url for the platform which will be scraped
        """
        raise NotImplementedError

