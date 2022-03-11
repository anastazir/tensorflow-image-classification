import tensorflow as tf
import cv2
import numpy as np
from config import *

from classifications.faceMaskClassification import maskClassification
from classifications.genderClassification   import genderClassification
from classifications.emotionClassification  import emotionClassificationURL
from classifications.glassesClassification  import glassesClassificationURL
from classifications.ageClassification      import ageClassificationURL

age_labels = ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']
emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

class EverythingClassification:
    def __init__(self, type, isCropped = False):
        self.type = type
        self.isCropped = isCropped
        self.face_detector = cv2.CascadeClassifier('./cascadeFiles/haarcascade_frontalface_default.xml')
        self.img_size = CLASSIFICATIONS[type]["img_size"]
        self.is_normalized = CLASSIFICATIONS[type]["normalize"]
        self.model = tf.lite.Interpreter(model_path = MODEL_LOCATIONS[type])
        self.labels = LABELS[type]
        self.multiclass = MULTIPLE_CLASSES[type]

    def predict(self, img):
        ans=[]
        result= maskClassification(img, isCropped=self.isCropped)
        ans.append(result['data'])
        result= genderClassification(img, isCropped=self.isCropped)
        ans.append(result['data'])
        # maskResult= emotionClassificationURL(img, isCropped=isCropped)
        # ans.append(maskResult['data'])
        result= glassesClassificationURL(img, isCropped=self.isCropped)
        ans.append(result['data'])
        result= ageClassificationURL(img, isCropped=self.isCropped)
        ans.append(result['data'])
        return{'data': ans}