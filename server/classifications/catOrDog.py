import cv2
import tensorflow as tf
import numpy as np

from loadModels import catVsDogModel

def catOrDogClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    img_size= 224
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    
    new_img = cv2.resize(new_img,(img_size,img_size))
    new_img = np.reshape(new_img,[1,img_size,img_size,3])/255.0
    pred = catVsDogModel.predict(new_img)
    print('---------------------pred[0]',pred[0])
    if pred.argmax()==0:
        print ('Cat')
        return {'data':"Cat"}
    else:
        print ('Dog')
        return {'data':'Dog'}
