import flask
import io
import string
import time
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


# --------------------------------------
from tensorflow.keras.preprocessing.image import  load_img

def predict_image(filename):
    img = load_img(filename, target_size=(128, 128))
    image = tf.keras.preprocessing.image.img_to_array(img)
    image = image / 255.0
    image = image.reshape(1,128,128,3)
    prediction = model.predict(image)
    print ("prediction------",prediction[0])
    if(prediction[0][0] > 0.5):
        return 1
    else:
        return 0 


# --------------------------------------
@app.route("/send-image/<path:url>")
def image_check(url):
    from datetime import datetime
    dateTimeObj = datetime.now()
    file_name_for_base64_data = dateTimeObj.strftime("%d-%b-%Y--(%H-%M-%S)")
    
    file_name_for_regular_data = url[-10:-4]
    print("url--------------------------",url)
    try:
        if "data:image/jpeg;base64," in url:
            base_string = url.replace("data:image/jpeg;base64,", "")
            decoded_img = base64.b64decode(base_string)
            img = Image.open(BytesIO(decoded_img))

            file_name = file_name_for_base64_data + ".jpg"
            img.save(file_name, "jpeg")

        elif "data:image/png;base64," in url:
            base_string = url.replace("data:image/png;base64,", "")
            decoded_img = base64.b64decode(base_string)
            img = Image.open(BytesIO(decoded_img))

            file_name = file_name_for_base64_data + ".png"
            img.save(file_name, "png")

        # Regular URL Form DATA
        else:
            print('sdafasdfasd')
            response = requests.get(url)
            img = Image.open(BytesIO(response.content)).convert("RGB")
            img= img.resize((150, 150))
            print(type(img))
            file_name = file_name_for_regular_data + ".jpg"
            img.save(file_name, "jpeg")
            print('image saved')
            prediction= predict_image(file_name)
            return {"data": f"{prediction}"}

        
        status = "Image has been succesfully sent to the server."
    except Exception as e:
        status = "Error! = " + str(e)


    return status

@app.route("/url/<path:image_url>")
def tensor(image_url):
    print(image_url)
    image_url = tf.keras.utils.get_file('Court', origin=image_url )
    img = tf.keras.preprocessing.image.load_img(image_url, target_size=( 128, 128 ) )
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    print('--------------------------------final step------')
    prediction = model.predict(np.expand_dims(img_array, axis=0)/255.0)
    print ("prediction------",prediction[0])
    if(prediction[0][0] > 0.5):
        return {'data':'1'}
    else:
        return {'data':'0'}

@app.route('/newRoute/<path:url>')
def urlPred(url):
    print('url is ', url)
    sample_mask_img = io.imread(url)    
    sample_mask_img = cv2.resize(sample_mask_img,(128,128))
    sample_mask_img = np.reshape(sample_mask_img,[1,128,128,3])
    sample_mask_img = sample_mask_img/255.0
    pred= model.predict(sample_mask_img)
    print('pred', pred)
    if pred[0][0]>pred[0][1]:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}



if __name__ == '__main__':
    app.run(debug=True)