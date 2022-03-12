import tensorflow as tf
import cv2
from config import *
from classifications.SingleClassifier import SingleClassifier

# from classifications.faceMaskClassification import maskClassification
# from classifications.genderClassification   import genderClassification
# from classifications.glassesClassification  import glassesClassificationURL
# from classifications.ageClassification      import ageClassificationURL


age_labels = ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']
emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
types = ["genderClassification", "faceMaskClassification",
         "glassesClassification", "ageClassification" ]
class EverythingClassification:
    def __init__(self, isCropped = False):
        self.isCropped = isCropped

    def perdict_image(self, img):
        ans = []
        for type in types:
            classifier = SingleClassifier(isCropped = self.isCropped, type = type)
            result = classifier.perdict_image(img)
            ans.append(result['data'])
        return {'data' : ans}