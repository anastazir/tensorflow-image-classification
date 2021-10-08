import flask
import io
import string
import os
import numpy as np
from numpy import asarray
from PIL import Image
from flask import Flask, jsonify, request
import tensorflow as tf
from PIL import Image
import base64
from io import BytesIO
import requests
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
from helperFunctions.returnArray import returnArray
from fetchLabels import getLabels
app = Flask(__name__)

masknet = tf.keras.models.load_model('./models/masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('./models/GenderModal.h5') # input shape of (150, 150, 3)
emotionClassification = tf.keras.models.load_model('./models/emotionDetection.h5') # input shape of (48, 48, 1)   
glassesModel = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (160, 160, 3)


add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=300'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

@app.route('/fetchLabels', methods=['GET', 'POST'])
def sendLabels():
    labelType= request.args['labelsType']
    print('Labeltype is ---------', labelType)
    result= getLabels(labelType)
    return {'labels': result}
            

# -------------------------------------- MASK CLASSIFICATION ------------------------------


@app.route('/faceMaskClassification/urlRoute/<path:url>')
def urlPred(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return maskClassification(img)


@app.route('/faceMaskClassification/upload-image', methods=['GET', 'POST'])
def uploadImageMaskClassification():
    if request.method == "POST":
        if request.files:
                return maskClassification(returnArray(request))
        else:
            return {'data': 'no files'}
# -------------------------------------END OF MASK CLASSIFICATION ------------------------------


# -------------------------------------GENDER CLASSIFICATION ------------------------------
@app.route('/genderClassification/urlRoute/<path:url>')
def urlPredGenderClassification(url):
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return genderClassification(img)

@app.route('/genderClassification/upload-image', methods=['GET', 'POST'])
def uploadImageGenderClassification(): 
    if request.method == "POST":
        if request.files:
            return genderClassification(returnArray(request))
        else:
            return {'data': 'no files'}
# -------------------------------------END OF GENDER CLASSIFICATION ------------------------------

# -------------------------------------Cat or Dog CLASSIFICATION ------------------------------
@app.route('/catvsDog/urlRoute/<path:url>')
def CatORDog(url):
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return catOrDogClassification(img)

@app.route('/catvsDog/upload-image', methods=['GET', 'POST'])
def uploadImageCatORDog(): 
    if request.method == "POST":
        if request.files:
            return catOrDogClassification(returnArray(request))
        else:
            return {'data': 'no files'}

# -------------------------------------END OF Cat or Dog CLASSIFICATION ------------------------------

# -------------------------------------EMOTION CLASSIFICATION ------------------------------

@app.route('/emotionClassification/urlRoute/<path:url>')
def urlEmotionClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return emotionClassificationURL(img)

# -------------------------------------END OF EMOTION CLASSIFICATION ------------------------------

# -------------------------------------Everything CLASSIFICATION ------------------------------

@app.route('/everything/urlRoute/<path:url>')
def everything(url):
    ans=[]
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    if "https://images.unsplash.com/" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    if len(faces)==0:return{'data': ['No face found']}

    for i in range(len(faces)):  # for emotion classification'
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(48,48))
        crop = np.reshape(crop,[1,48,48,1])/255.0
        pred = emotionClassification.predict(crop)
        print('---------------------pred[0]',pred)
        ans.append(emotion_labels[pred.argmax()])
        
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.06, minNeighbors=3) #returns a list of (x,y,w,h) tuples
    print('------------------no of face', len(faces))
    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(150,150))
        crop = np.reshape(crop,[1,150,150,3])/255.0
        pred = genderModel.predict(crop)
        break
    if pred[0][1]<0.5:
        ans.append('Female')
    else:
        ans.append('Male')

    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(128,128))
        crop = np.reshape(crop,[1,128,128,3])/255.0
        pred = masknet.predict(crop)
        break                   # only predict for the first face
    if pred[0][1]<0.5:
        ans.append('Mask')
    else:
        ans.append("No Mask")

    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(160,160))
        crop = np.reshape(crop,[1,160,160,3])
        pred = glassesModel.predict(crop)
        print('---------------------pred[0]',pred[0])
        # break                   # only predict for the first face
        if pred[0][0]>0:
            ans.append("No Glasses")
        else:
            ans.append('Glasses')
        break
    return{'data': ans}
    
# -------------------------------------END OF Everything CLASSIFICATION ------------------------------

#--------------------------------------Glasses Classification---------------------------------
@app.route('/glassesClassification/urlRoute/<path:url>')
def urlGlassesClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return glassesClassificationURL(img)


#--------------------------------------Food Classification---------------------------------
@app.route('/foodClassification/urlRoute/<path:url>')
def urlFoodClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return foodClassificationURL(img)

#--------------------------------------Dog Breed Classification---------------------------------
@app.route('/dogClassification/urlRoute/<path:url>')
def urlDogClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return dogClassificationURL(img)

@app.route('/dogClassification/upload-image', methods=['GET', 'POST'])
def uploadImageDogClassification():
    if request.method == "POST":
        if request.files:
            image = request.files["file"]
            if image:
                img= Image.open(image)
                numpydata = asarray(img)
                return dogClassificationURL(numpydata)
    else:
        return {'data': 'no files'}
#--------------------------------------Birds Classification---------------------------------
@app.route('/birdsClassification/urlRoute/<path:url>')
def urlBirdsClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return birdsClassificationURL(img)

#----------------------------------------END OF BIRD CLASSIFICATION---------------------------------

#--------------------------------------WILDLIFE Classification---------------------------------
@app.route('/wildlifeClassification/urlRoute/<path:url>')
def wildlifeClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    return wildlifeClassificationURL(img)

#----------------------------------------END OFWILDLIFE CLASSIFICATION---------------------------------

if __name__ == '__main__':
    app.run(debug=True)