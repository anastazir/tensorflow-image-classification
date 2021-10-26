import cv2
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
from loadModels import masknet, maskInterpreter

def maskClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(gray_img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples
    new_img = img
    img_shape= 224
    if len(faces)==0: return {"data": "No faces were found"}
    print('------------------found face')
    (x,y,w,h) = faces[0]
    new_img = new_img[y:y+h,x:x+w]
    input_details = maskInterpreter.get_input_details()
    output_details = maskInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])/225.0


    maskInterpreter.allocate_tensors()
    maskInterpreter.set_tensor(input_details[0]['index'], new_img)
    maskInterpreter.invoke()
    pred = maskInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    if pred[0].argmax() == 0:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}


def urlPredSecondOption(new_img, shape):  # IF NO FACES ARE FOUND
    sample_mask_img = cv2.resize(new_img,(shape,shape))
    sample_mask_img = np.reshape(sample_mask_img,[1,shape,shape,3])
    sample_mask_img = sample_mask_img/255.0
    pred= masknet.predict(sample_mask_img)
    print('NO FACE PRED---------------',pred)
    if pred[0][1]<0.5:
        print ('Mask')
        return {'data':"Mask"}
    else:
        print ('No Mask')
        return {'data':'No Mask'}

