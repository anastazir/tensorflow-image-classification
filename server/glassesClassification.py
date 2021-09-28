import cv2
import tensorflow as tf
import numpy as np

glassesModel = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (128, 128, 3)

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def glassesClassificationURL(img):
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.06, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    if len(faces)==0:
        print('no faces were found')
        return  {'data': "No faces were found"}
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(160,160))
        crop = np.reshape(crop,[1,160,160,3])
        pred = glassesModel.predict(crop)
        print('---------------------pred[0]',pred[0])
        # break                   # only predict for the first face
        if pred[0][0]>0:
            print ('No glasses')
            return {'data':"No Glasses"}
        else:
            print ('Glasses')
            return {'data':'Glasses'}
    return {"data":"No faces were found"}