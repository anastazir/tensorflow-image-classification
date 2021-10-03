from PIL import Image
from numpy import asarray

def returnArray(request):
        image = request.files["file"]
        if image:
            img= Image.open(image)
            numpydata = asarray(img)
            return numpydata