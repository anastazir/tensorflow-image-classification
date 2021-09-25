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
from faceMaskClassification import maskClassification, baseMaskClassification


app = Flask(__name__)

masknet = tf.keras.models.load_model('masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('GenderModal.h5') # input shape of (150, 150, 3)
catVsDogModel = tf.keras.models.load_model('catVsDogModel.h5') # input shape of (150, 150, 3)   
emotionClassification = tf.keras.models.load_model('emotionDetection.h5') # input shape of (48, 48, 1)   


add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=300'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


# -------------------------------------- MASK CLASSIFICATION ------------------------------

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
# -------------------------------------END OF GENDER CLASSIFICATION ------------------------------

# -------------------------------------Cat or Dog CLASSIFICATION ------------------------------
@app.route('/catvsDog/urlRoute/<path:url>')
def urlPredCatORDog(url):
    if "https://images.unsplash.com/photo" in url:
        url= url+ add 
    print(url)
    img = io.imread(url)    
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)


    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    
    new_img = cv2.resize(new_img,(150,150))
    new_img = np.reshape(new_img,[1,150,150,3])/255.0
    pred = catVsDogModel.predict(new_img)
    print('---------------------pred[0]',pred[0])
    if pred[0]<0.5:
        print ('Cat')
        return {'data':"Cat"}
    else:
        print ('Dog')
        return {'data':'Dog'}

@app.route("/genderClassification/base64/<path:base64_string>")
def decodeAnimal(base64_string): 
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

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    new_img = cv2.resize(new_img,(150,150))
    new_img = np.reshape(new_img,[1,150,150,3])/255.0
    pred = genderModel.predict(new_img)
    print('-----------------------pred[0]',pred[0])
    if pred[0]<0.5:
        print ('Cat')
        return {'data':"Cat"}
    else:
        print ('Dog')
        return {'data':'Dog'}

# -------------------------------------END OF Cat or Dog CLASSIFICATION ------------------------------

# -------------------------------------EMOTION CLASSIFICATION ------------------------------

@app.route('/emotionClassification/urlRoute/<path:url>')
def urlEmotionClassification(url):
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    if "https://images.unsplash.com/" in url:
        url= url+ add
    print(url)
    img = io.imread(url)    
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    # new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    # if len(faces)==0:
    #     print('no faces were found')
    #     return  urlPredSecondOption(new_img, shape=128)
    print("lenght of faces is----",len(faces))
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(48,48))
        crop = np.reshape(crop,[1,48,48,1])/255.0
        pred = emotionClassification.predict(crop)
        print('---------------------pred[0]',pred)
        return {"data":  f"{emotion_labels[pred.argmax()]}"}
    return {"data": 'Face not found'}

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

    return{'data': ans}
    
# -------------------------------------END OF Everything CLASSIFICATION ------------------------------

if __name__ == '__main__':
    app.run(debug=True)