import cv2
import tensorflow as tf
import numpy as np

from loadModels import emotionClassification, emotionInterpreter

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def emotionClassificationURL(img):
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    img_shape= 48
    if len(faces)==0: return {"data": "No faces were found"}
    print('------------------found face')
    (x,y,w,h) = faces[0]
    new_img = img[y:y+h,x:x+w]
    input_details = emotionInterpreter.get_input_details()
    output_details = emotionInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 1])/255.0


    emotionInterpreter.allocate_tensors()
    emotionInterpreter.set_tensor(input_details[0]['index'], new_img)
    emotionInterpreter.invoke()
    pred = emotionInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    return  {"data":  f"{emotion_labels[pred.argmax()]}"}