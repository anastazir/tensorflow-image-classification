import cv2
import tensorflow as tf
import numpy as np

from loadModels import genderModel
from loadModels import genderInterpreter


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')


def genderClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    img_shape= 150
    if len(faces)==0: return {"data": "No faces were found"}
    print('------------------found face')
    (x,y,w,h) = faces[0]
    new_img = new_img[y:y+h,x:x+w]
    img_shape= 150
    input_details = genderInterpreter.get_input_details()
    output_details = genderInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])/225.0


    genderInterpreter.allocate_tensors()
    genderInterpreter.set_tensor(input_details[0]['index'], new_img)
    genderInterpreter.invoke()
    pred = genderInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    if pred[0].argmax() == 0:
        print ('Female')
        return {'data':"Female"}
    else:
        print ('Male')
        return {'data':'Male'}
