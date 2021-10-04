from PIL import Image
from numpy import asarray

def returnArray(request):
    """
    Takes the request as a parameter, then finds the file attached to it and
    converts it into a numpy array.
    """
    image = request.files["file"]
    if image:
        img= Image.open(image)
        numpydata = asarray(img)
        return numpydata