import tensorflow as tf
import cv2
import numpy as np
from config import *

age_labels = ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']
emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

class FaceClassification:
    def __init__(self, type, isCropped = False):
        self.type = type
        self.isCropped = isCropped
        self.face_detector = cv2.CascadeClassifier('./cascadeFiles/haarcascade_frontalface_default.xml')
        self.img_size = CLASSIFICATIONS[type]["img_size"]
        self.is_normalized = CLASSIFICATIONS[type]["normalize"]
        self.model = tf.lite.Interpreter(model_path = MODEL_LOCATIONS[type])
        self.labels = LABELS[type]
        self.multiclass = MULTIPLE_CLASSES[type]

    def detect_faces(self, img):
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        faces = self.face_detector.detectMultiScale(gray_img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

        print('------------------no of face', len(faces))

        if len(faces)==0:
            print("no faces detected")
            return img

        (x,y,w,h) = faces[0]
        crop = img[y:y+h,x:x+w] # cropped image in 3 color channels
        return crop

    def perdict_image(self, img):
        if self.isCropped:
            img = self.detect_faces(img)

        new_img = cv2.resize(img,(self.img_size, self.img_size)).astype("float32")

        if self.is_normalized:
            new_img = np.reshape(new_img,[1, self.img_size, self.img_size, 3])/225.0
        else:
            new_img = np.reshape(new_img,[1, self.img_size, self.img_size, 3])

        input_details = self.model.get_input_details()
        output_details = self.model.get_output_details()

        self.model.allocate_tensors()
        self.model.set_tensor(input_details[0]['index'], new_img)
        self.model.invoke()
        pred = self.model.get_tensor(output_details[0]['index'])

        del self.model

        if self.type == 'catvsDog':
            if pred[0].argmax() == 0:
                return {'data': 'Cat'}
            else:
                return {'data': 'Dog'}

        elif self.type == 'faceMaskClassification':
            if pred[0].argmax() == 0:
                return {'data':"Mask"}
            else:
                return {'data':'No Mask'}

        elif self.type == 'genderClassification':
            if pred[0].argmax() == 0:
                return {'data':"Female"}
            else:
                return {'data':'Male'}

        elif self.type == 'glassesClassification':
            if pred[0] > 0:
                return {'data':'No Glasses'}
            else:
                return {'data':"Glasses"}

        elif self.type == 'ageClassification':
            return  {"data":  f"{age_labels[pred.argmax()]}"}
        elif self.type == 'emotionClassification':
            return  {"data":  f"{emotion_labels[pred.argmax()]}"}