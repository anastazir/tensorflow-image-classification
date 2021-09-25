import cv2
import tensorflow as tf
import numpy as np

genderModel = tf.keras.models.load_model('GenderModal.h5') # input shape of (150, 150, 3)

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


def genderClassification(img):
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
    return {"data": "No faces were found"}

def baseGenderClassification(img):
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
    return {"data": "No faces were found"}