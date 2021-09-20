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

model = tf.keras.models.load_model('masknet.h5')
add='?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTYyOTB8MHwxfHNlYXJjaHw5fHxmYWNlfGVufDB8fHx8MTYzMjA1MDM4MQ&ixlib=rb-1.2.1&q=80&w=400'
face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def prepare_image(img):
    print('Preparing image')
    img = Image.open(io.BytesIO(img))
    img = img.resize((128, 128))
    img = np.array(img)
    img = np.expand_dims(img, 0)
    print('returning img')
    return img


def predict_result(img):
    print('Predict results')
    predictions= model.predict(img)[0][0]
    print(predictions)
    if predictions>0.5:
        return 1    # NO MASK
    else:
        return 0    #MASK



@app.route('/predict', methods=['POST'])
def infer_image():
    if 'file' not in request.files:
        return "Please try again. The Image doesn't exist"
    print(request.files)
    file = request.files.get('file')

    if not file:
        return

    img_bytes = file.read()
    img = prepare_image(img_bytes)
    print('final step')
    return jsonify(data=predict_result(img))
    

@app.route('/', methods=['GET'])
def index():
    return 'Machine Learning Inference'



def urlPredSecondOption(url):  # IF NO FACES ARE FOUND
    sample_mask_img = io.imread(url)    
    sample_mask_img = cv2.resize(sample_mask_img,(128,128))
    sample_mask_img = np.reshape(sample_mask_img,[1,128,128,3])
    sample_mask_img = sample_mask_img/255.0
    pred= model.predict(sample_mask_img)
    print('NO FACE PRED---------------',pred)
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}


# --------------------------------------
@app.route("/send-image/<path:base64_string>")
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

    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(128,128))
        crop = np.reshape(crop,[1,128,128,3])/255.0
        pred = model.predict(crop)
        break
    print('-----------------------pred[0]',pred[0])
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}


@app.route('/newRoute/<path:url>')
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
        pred = model.predict(crop)
        print('---------------------pred[0]',pred[0])
        break                   # only predict for the first face
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}



if __name__ == '__main__':
    app.run(debug=True)