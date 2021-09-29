import flask
import io
import string
import os
import numpy as np
from PIL import Image
from flask import Flask, jsonify, request
import tensorflow as tf
from PIL import Image
import base64
from io import BytesIO
import requests
import cv2
from skimage import io

# IMPORT FUNCTIONS
from faceMaskClassification import maskClassification, baseMaskClassification
from genderClassification import genderClassification, baseGenderClassification
from catOrDog import catOrDogClassification, baseCatOrDogClassification
from emotionClassification import emotionClassificationURL
from glassesClassification import glassesClassificationURL
from foodClassification import foodClassificationURL
from dogClassification import dogClassificationURL

app = Flask(__name__)

masknet = tf.keras.models.load_model('./models/masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('./models/GenderModal.h5') # input shape of (150, 150, 3)
# catVsDogModel = tf.keras.models.load_model('catVsDogModel.h5') # input shape of (150, 150, 3)   
emotionClassification = tf.keras.models.load_model('./models/emotionDetection.h5') # input shape of (48, 48, 1)   
glassesModel = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (160, 160, 3)


add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=300'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


def trimString(base64_string):
    if "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpeg;base64,", "")
    elif "data:image/png;base64," in base64_string:
        base64_string = base64_string.replace("data:image/png;base64,", "")
    elif "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpg;base64,", "")
    if isinstance(base64_string, bytes):
        base64_string = base64_string.decode("utf-8")
    return base64_string


# -------------------------------------- MASK CLASSIFICATION ------------------------------

@app.route("/faceMaskClassification/base64/<path:base64_string>")
def decodeFace(base64_string): 
    imgdata = base64.b64decode(trimString(base64_string))
    img = io.imread(imgdata, plugin='imageio')
    return baseMaskClassification(img)


@app.route('/faceMaskClassification/urlRoute/<path:url>')
def urlPred(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return maskClassification(img)

# -------------------------------------END OF MASK CLASSIFICATION ------------------------------


# -------------------------------------GENDER CLASSIFICATION ------------------------------
@app.route('/genderClassification/urlRoute/<path:url>')
def urlPredGenderClassification(url):
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return genderClassification(img)

@app.route("/genderClassification/base64/<path:base64_string>")
def decodeGender(base64_string): 

    imgdata = base64.b64decode(trimString(base64_string))
    img = io.imread(imgdata, plugin='imageio')
    return baseGenderClassification(img)
# -------------------------------------END OF GENDER CLASSIFICATION ------------------------------

# -------------------------------------Cat or Dog CLASSIFICATION ------------------------------
@app.route('/catvsDog/urlRoute/<path:url>')
def urlPredCatORDog(url):
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    return catOrDogClassification(img)

@app.route("/genderClassification/base64/<path:base64_string>")
def decodeAnimal(base64_string): 
    imgdata = base64.b64decode(trimString(base64_string))
    
    img = io.imread(imgdata, plugin='imageio')
    return baseCatOrDogClassification(img)

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


if __name__ == '__main__':
    app.run(debug=True)