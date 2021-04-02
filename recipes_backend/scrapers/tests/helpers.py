import os

def resource_file(filename):
    current_dir = os.path.dirname(__file__)
    return os.path.join(current_dir, "resources/" + filename)