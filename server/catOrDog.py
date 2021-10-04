import cv2
import tensorflow as tf
import numpy as np

catVsDogModel = tf.keras.models.load_model('./models/catVsDogModel.h5') # input shape of (150, 150, 3)   

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def catOrDogClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    
    new_img = cv2.resize(new_img,(150,150))
    new_img = np.reshape(new_img,[1,150,150,3])/255.0
    pred = catVsDogModel.predict(new_img)
    print('---------------------pred[0]',pred[0])
    if pred[0]<0.5:
        print ('Cat')
        return {'data':"Cat"}
    else:
        print ('Dog')
        return {'data':'Dog'}
