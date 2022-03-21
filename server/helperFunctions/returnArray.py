from PIL import Image
from numpy import asarray
from PIL import Image
from io import BytesIO
import base64

def returnArray(data):
    """
    Takes the request as a parameter, then finds the base64 string attached to it and
    converts it into a numpy array.
    """
    if data["base64"]:
        base64str= data["base64"]
        imageDecoded = Image.open(BytesIO(base64.b64decode(base64str)))
        numpydata = asarray(imageDecoded)
    if data["isCropped"] == 'true':
        dx= int(data['dx'])
        dy= int(data['dy'])
        dHeight= int(data['dHeight'])
        dWidth= int(data['dWidth'])
        numpydata= numpydata[dy:dy+dHeight, dx:dx+dWidth]
    return numpydata