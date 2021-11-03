from PIL import Image
from numpy import asarray
from PIL import Image
from io import BytesIO
import base64

def returnArray(request):
    """
    Takes the request as a parameter, then finds the base64 string attached to it and
    converts it into a numpy array.
    """
    if request.form["base64"]:
        base64str= request.form["base64"]
        imageDecoded = Image.open(BytesIO(base64.b64decode(base64str)))
        numpydata = asarray(imageDecoded)
    if request.form["isCropped"] == 'true':
        dx= int(request.form['dx'])
        dy= int(request.form['dy'])
        dHeight= int(request.form['dHeight'])
        dWidth= int(request.form['dWidth'])
        numpydata= numpydata[dy:dy+dHeight, dx:dx+dWidth]
    return numpydata