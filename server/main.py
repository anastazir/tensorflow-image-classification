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


app = Flask(__name__)

model = tf.keras.models.load_model('Facemask002.h5')

def prepare_image(img):
    print('Preparing image')
    img = Image.open(io.BytesIO(img))
    img = img.resize((150, 150))
    img = np.array(img)
    img = np.expand_dims(img, 0)
    print('returning img')
    return img


def predict_result(img):
    print('Predict results')
    predictions= model.predict(img)[0][0]
    print(predictions)
    if predictions>=0.5:
        return 1
    else:
        return 0



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
    return jsonify(prediction=predict_result(img))
    

@app.route('/', methods=['GET'])
def index():
    return 'Machine Learning Inference'


# --------------------------------------
from tensorflow.keras.preprocessing.image import  load_img

def predict_image(filename):
    img = load_img(filename, target_size=(150, 150))
    image = tf.keras.preprocessing.image.img_to_array(img)
    image = image / 255.0
    image = image.reshape(1,150,150,3)
    prediction = model.predict(image)
    print (prediction[0])
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
    print(url)
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
        
            return jsonify(prediction= predict_image(file_name))

        
        status = "Image has been succesfully sent to the server."
    except Exception as e:
        status = "Error! = " + str(e)


    return status


if __name__ == '__main__':
    app.run(debug=True)