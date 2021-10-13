import cv2
import tensorflow as tf
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

ageClassifier = tf.keras.models.load_model('./models/ageXception80.h5') # input shape of (80, 80, 1)   


def ageClassificationURL(img):
    age_labels = ['25-30','42-48','60-98','6-20']

    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(imgGray,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    print("number of faces are----",len(faces))
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(80,80))
        crop = np.reshape(crop,[1,80,80,3])/255.0
        pred = ageClassifier.predict(crop)
        print('---------------------pred[0]',pred)
        return {"data":  f"{age_labels[pred.argmax()]}"}
    return {"data": 'Face not found'}