import io
from flask import Flask, request
from skimage import io
from flask_cors import CORS
import json

# IMPORT FUNCTIONS
from helperFunctions.returnArray      import returnArray
from fetchLabels                      import getLabels
# IMPORT CLASSES
from classifications.EverythingClass  import EverythingClassification
from classifications.SingleClassifier import SingleClassifier
from classifications.MultiClassifier  import MultiClassifier

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

    data = json.loads(request.data)
    url= data['url']

    try:
        img = io.imread(url)
    except:
        return {'data': 'ERROR: unable to read image'}
    if data["isCropped"] == True:
        isCropped = True
        dx= data['dx']
        dy= data['dy']
        dHeight= data['dHeight']
        dWidth= data['dWidth']
        img= img[dy:dy+dHeight, dx:dx+dWidth]
    else:
        isCropped = False

    if classificationType == "everything":
        classifier = EverythingClassification(isCropped = isCropped)
    elif classificationType in ["faceMaskClassification", "genderClassification", "emotionClassification", "glassesClassification", "ageClassification", "catvsDog"]:
        classifier = SingleClassifier(type= classificationType, isCropped = isCropped)
    else:
        classifier = MultiClassifier(type = classificationType)

    return classifier.perdict_image(img)

@app.route('/upload-image/<classificationType>', methods=['POST'])
def uploadImageAndClassify(classificationType):
    data = json.loads(request.data)

    if not data['base64']:
        return  {'data': 'unable to  read file'}
        
    if data["isCropped"] == 'true':
        isCropped= True
    else: isCropped= False

    img = returnArray(data)

    if classificationType in ["faceMaskClassification", "genderClassification", "emotionClassification", "glassesClassification", "ageClassification", "catvsDog"]:
        classifier = SingleClassifier(type= classificationType, isCropped = isCropped)
    else:
        classifier = MultiClassifier(type = classificationType)
    return classifier.perdict_image(img)

@app.route('/')
def ping():
    return {'data': 'server is on and running.'}