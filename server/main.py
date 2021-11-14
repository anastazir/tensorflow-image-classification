import io
from flask import Flask, request
from skimage import io
from flask_cors import CORS, cross_origin

# IMPORT FUNCTIONS
from classifications.everything             import everythingURL
from classifications.faceMaskClassification import maskClassification
from classifications.genderClassification   import genderClassification
from classifications.emotionClassification  import emotionClassificationURL
from classifications.glassesClassification  import glassesClassificationURL
from classifications.ageClassification      import ageClassificationURL
from classifications.catOrDog               import catOrDogClassification
from classifications.dogClassification      import dogClassificationURL
from classifications.birdsClassification    import birdsClassificationURL
from classifications.wildlifeClassification import wildlifeClassificationURL
from classifications.foodClassification     import foodClassificationURL
from classifications.flowerClassification   import flowerClassificationURL
from classifications.animalClassification   import animalsClassificationURL
from helperFunctions.returnArray            import returnArray
from fetchLabels                            import getLabels

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/fetchLabels', methods=['GET', 'POST'])
def sendLabels():
    labelType= request.args['labelsType']
    print('Labeltype is ---------', labelType)
    result= getLabels(labelType)
    return {'labels': result}
            

@app.route('/urlRoute/<classificationType>', methods=['POST'])
def dynamicRoute(classificationType):
    if request.method != "POST":
        return {'data': 'only POST method is supported'}

    url= request.form['url']

    try:
        img = io.imread(url)  

    except:
        return {'data': 'ERROR: unable to read image'}

    if request.form["isCropped"] == 'true':
        isCropped= True
        dx= int(request.form['dx'])
        dy= int(request.form['dy'])
        dHeight= int(request.form['dHeight'])
        dWidth= int(request.form['dWidth'])
        img= img[dy:dy+dHeight, dx:dx+dWidth]
        
    else:
        isCropped= False

    if classificationType == "catvsDog":
        return catOrDogClassification(img)

    elif classificationType == "faceMaskClassification":
        return maskClassification(img, isCropped=isCropped)

    elif classificationType == "genderClassification":
        return genderClassification(img, isCropped=isCropped)

    elif classificationType == "emotionClassification":
        return emotionClassificationURL(img, isCropped=isCropped)

    elif classificationType == "glassesClassification":
        return glassesClassificationURL(img, isCropped=isCropped)

    elif classificationType == "foodClassification":
        return foodClassificationURL(img)

    elif classificationType == "dogClassification":
        return dogClassificationURL(img)

    elif classificationType == "birdsClassification":
        return birdsClassificationURL(img)

    elif classificationType == "wildlifeClassification":
        return wildlifeClassificationURL(img)

    elif classificationType == "everything":
        return everythingURL(img, isCropped=isCropped)

    elif classificationType == "ageClassification":
        return ageClassificationURL(img, isCropped=isCropped)

    elif classificationType == "flowerClassification":
        return flowerClassificationURL(img)

    elif classificationType == "animalClassification":
        return animalsClassificationURL(img)

    else:
        return {'data': 'this route does not exist'}

@app.route('/upload-image/<classificationType>', methods=['POST'])
def uploadImageAndClassify(classificationType):
    if not request.form['base64']:
        return  {'data': 'unable to  read file'}
        
    if request.form["isCropped"] == 'true':
        isCropped= True
    else: isCropped= False

    if classificationType == "catvsDog":
        return catOrDogClassification(returnArray(request))

    elif classificationType == "faceMaskClassification":
        return maskClassification(returnArray(request), isCropped= isCropped)

    elif classificationType == "genderClassification":
        return genderClassification(returnArray(request), isCropped= isCropped)

    elif classificationType == "emotionClassification":
        return emotionClassificationURL(returnArray(request), isCropped= isCropped)

    elif classificationType == "glassesClassification":
        return glassesClassificationURL(returnArray(request), isCropped= isCropped)

    elif classificationType == "foodClassification":
        return foodClassificationURL(returnArray(request))

    elif classificationType == "dogClassification":
        return dogClassificationURL(returnArray(request))

    elif classificationType == "birdsClassification":
        return birdsClassificationURL(returnArray(request))

    elif classificationType == "wildlifeClassification":
        return wildlifeClassificationURL(returnArray(request))

    elif classificationType == "everything":
        return everythingURL(returnArray(request), isCropped= isCropped)

    elif classificationType == "ageClassification":
        return ageClassificationURL(returnArray(request), isCropped= isCropped)

    elif classificationType == "flowerClassification":
        return  flowerClassificationURL(returnArray(request))

    elif classificationType == "animalClassification":
        return animalsClassificationURL(returnArray(request))

    else:
        return {'data': 'this route does not exist'}

@app.route('/')
def ping():
    return {'data': 'server is on and running.'}