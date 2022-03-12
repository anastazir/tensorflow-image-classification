import tensorflow as tf
import cv2
import numpy as np
from config import *

class SingleClassifier():

    def __init__(self, type):
        self.type = type
        self.img_size = CLASSIFICATIONS[type]["img_size"]
        self.is_normalized = CLASSIFICATIONS[type]["normalize"]
        self.model = tf.lite.Interpreter(model_path = MODEL_LOCATIONS[type])
        self.labels = LABELS[type]
        self.multiclass = MULTIPLE_CLASSES[type]

    def perdict_image(self, img):
        input_details = self.model.get_input_details()
        output_details = self.model.get_output_details()
        ans= []
        new_img = cv2.resize(img,(self.img_size, self.img_size)).astype("float32")
        if self.is_normalized:
            new_img = np.reshape(new_img,[1, self.img_size, self.img_size, 3])/225.0
        else:
            new_img = np.reshape(new_img,[1, self.img_size, self.img_size, 3])
        self.model.allocate_tensors()
        self.model.set_tensor(input_details[0]['index'], new_img)
        self.model.invoke()
        pred = self.model.get_tensor(output_details[0]['index'])
        arr= pred[0]

        arr1=arr.argsort()[-3:][::-1]  #get the top three results
        for i in arr1:
            ans.append(f'{self.labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal palces

        # deleting variables after use

        del self.model
        del self.labels

        return {'data': ans}