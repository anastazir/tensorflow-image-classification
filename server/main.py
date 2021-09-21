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
app = Flask(__name__)

masknet = tf.keras.models.load_model('masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('GenderModal.h5') # input shape of (150, 150, 3)
add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=400'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


# -------------------------------------- MASK CLASSIFICATION ------------------------------


def urlPredSecondOption(url):  # IF NO FACES ARE FOUND
    sample_mask_img = io.imread(url)    
    sample_mask_img = cv2.resize(sample_mask_img,(128,128))
    sample_mask_img = np.reshape(sample_mask_img,[1,128,128,3])
    sample_mask_img = sample_mask_img/255.0
    pred= masknet.predict(sample_mask_img)
    print('NO FACE PRED---------------',pred)
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}



@app.route("/faceMaskClassification/base64/<path:base64_string>")
def decodeFace(base64_string): 
    if "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpeg;base64,", "")
    elif "data:image/png;base64," in base64_string:
        base64_string = base64_string.replace("data:image/png;base64,", "")
    elif "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpg;base64,", "")
    if isinstance(base64_string, bytes):
        base64_string = base64_string.decode("utf-8")

    imgdata = base64.b64decode(base64_string)
    img = io.imread(imgdata, plugin='imageio')
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    if len(faces)==0:
        print('----------------------no faces were found')
    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(128,128))
        crop = np.reshape(crop,[1,128,128,3])/255.0
        pred = masknet.predict(crop)
        break
    print('-----------------------pred[0]',pred[0])
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}


@app.route('/faceMaskClassification/urlRoute/<path:url>')
def urlPred(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    if len(faces)==0:
        print('no faces were found')
        return  urlPredSecondOption(url)
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(128,128))
        crop = np.reshape(crop,[1,128,128,3])/255.0
        pred = masknet.predict(crop)
        print('---------------------pred[0]',pred[0])
        break                   # only predict for the first face
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}

# -------------------------------------END OF MASK CLASSIFICATION ------------------------------

@app.route('/genderClassification/urlRoute/<path:url>')
def urlPredGenderClassification(url):
    if "https://images.unsplash.com/" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    # if len(faces)==0:
    #     print('no faces were found')
    #     return  urlPredSecondOption(url)
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(150,150))
        crop = np.reshape(crop,[1,150,150,3])/255.0
        pred = genderModel.predict(crop)
        print('---------------------pred[0]',pred[0])
        break                   # only predict for the first face
    if pred[0][1]<0.5:
        print ('Female')
        return {'data':"Female"}
    else:
        print ('Male')
        return {'data':'Male'}

@app.route("/genderClassification/base64/<path:base64_string>")
def decodeGender(base64_string): 
    if "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpeg;base64,", "")
    elif "data:image/png;base64," in base64_string:
        base64_string = base64_string.replace("data:image/png;base64,", "")
    elif "data:image/jpeg;base64," in base64_string:
        base64_string = base64_string.replace("data:image/jpg;base64,", "")
    if isinstance(base64_string, bytes):
        base64_string = base64_string.decode("utf-8")

    imgdata = base64.b64decode(base64_string)
    img = io.imread(imgdata, plugin='imageio')
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    if len(faces)==0:
        print('----------------------no faces were found')
    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(150,150))
        crop = np.reshape(crop,[1,150,150,3])/255.0
        pred = genderModel.predict(crop)
        break
    print('-----------------------pred[0]',pred[0])
    if pred[0][1]<0.5:
        print ('Female')
        return {'data':"Female"}
    else:
        print ('Male')
        return {'data':'Male'}


if __name__ == '__main__':
    app.run(debug=True)