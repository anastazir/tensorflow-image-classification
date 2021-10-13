# import flask
import io
# import string
# import os
import numpy as np
from numpy import asarray
from PIL import Image
from flask import Flask, jsonify, request
import tensorflow as tf
from PIL import Image
# import base64
from io import BytesIO
# import requests
import cv2
from skimage import io
import matplotlib.image as mpimg


# IMPORT FUNCTIONS
from faceMaskClassification import maskClassification
from genderClassification import genderClassification
from catOrDog import catOrDogClassification
from emotionClassification import emotionClassificationURL
from glassesClassification import glassesClassificationURL
from foodClassification import foodClassificationURL
from dogClassification import dogClassificationURL
from birdsClassification import birdsClassificationURL
from wildlifeClassification import wildlifeClassificationURL
from ageClassification import ageClassificationURL
from everything import everythingURL

from helperFunctions.returnArray import returnArray
from fetchLabels import getLabels
app = Flask(__name__)

add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=300'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

@app.route('/fetchLabels', methods=['GET', 'POST'])
def sendLabels():
    labelType= request.args['labelsType']
    print('Labeltype is ---------', labelType)
    result= getLabels(labelType)
    return {'labels': result}
            

@app.route('/<classificationType>/urlRoute/<path:url>')
def dynamicRoute(classificationType, url):
    print('------------------------', classificationType)
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 

    img = io.imread(url)  

    if classificationType == "catvsDog":
        return catOrDogClassification(img)

    elif classificationType == "faceMaskClassification":
        return maskClassification(img)

    elif classificationType == "genderClassification":
        return genderClassification(img)

    elif classificationType == "emotionClassification":
        return emotionClassificationURL(img)

    elif classificationType == "glassesClassification":
        return glassesClassificationURL(img)

    elif classificationType == "foodClassification":
        return foodClassificationURL(img)

    elif classificationType == "dogClassification":
        return dogClassificationURL(img)

    elif classificationType == "birdsClassification":
        return birdsClassificationURL(img)

    elif classificationType == "wildlifeClassification":
        return wildlifeClassificationURL(img)

    elif classificationType == "everything":
        return everythingURL(img)

    elif classificationType == "ageClassification":
        return ageClassificationURL(img)

    else:
        return {'data': 'this route does not exist'}

@app.route('/upload-image/<classificationType>', methods=['GET', 'POST'])
def uploadImageAndClassify(classificationType):
    if request.method != "POST" or not request.files:
        return {'data': 'no files were found'}
    
    if classificationType == "faceMaskClassification":
        return  maskClassification(returnArray(request))  

    elif classificationType == "genderClassification":
        return  genderClassification(returnArray(request))

    elif classificationType == "catvsDog":
        return  catOrDogClassification(returnArray(request))   

    else:
        return {'data': 'this route does not exist'}


if __name__ == '__main__':
    app.run(debug=True)