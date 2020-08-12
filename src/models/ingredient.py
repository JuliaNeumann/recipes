"""
Ingredient Model Module
"""

class Ingredient:
    """
    Main Ingredient Data Class
    """

    def __init__(self, name,  num_portions, amount=None, unit=None, amount_str=None):
        self.name = name
        self.num_portions = num_portions
        self.amount = amount
        self.unit = unit
        if amount_str:
            self.get_amount_from_str(amount_str)

    def get_amount_from_str(self, amount_str):
        amount_arr = amount_str.split()
        if (len(amount_arr) > 0 and amount_arr[0].isnumeric()):
            self.amount = int(amount_arr.pop(0))

        if (len(amount_str) > 0):
            self.unit = " ".join(amount_arr)

        # TODO: cover more cases here!!

    def __str__(self):
        amount = ""
        if self.amount:
            amount = str(self.amount) + " "
        return f'{amount}{self.unit + " " if self.unit else ""}{self.name} (für {self.num_portions} Portionen)'