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
    if request.form["isCropped"] == 'true':
        dx= int(request.form['dx'])
        dy= int(request.form['dy'])
        dHeight= int(request.form['dHeight'])
        dWidth= int(request.form['dWidth'])
        print(dx, dy, dHeight, dWidth)
        numpydata= numpydata[dy:dy+dHeight, dx:dx+dWidth]
    return numpydata