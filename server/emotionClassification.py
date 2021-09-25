import cv2
import tensorflow as tf
import numpy as np

emotionClassification = tf.keras.models.load_model('emotionDetection.h5') # input shape of (48, 48, 1)   

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def emotionClassificationURL(img):
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    # new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    # if len(faces)==0:
    #     print('no faces were found')
    #     return  urlPredSecondOption(new_img, shape=128)
    print("number of faces are----",len(faces))
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