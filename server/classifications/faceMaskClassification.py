import cv2
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
from loadModels import maskInterpreter

def maskClassification(img, isCropped=False):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    if not isCropped:
        faces = face_model.detectMultiScale(gray_img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples
        print('------------------no of face', len(faces))

        if len(faces)==0:return{'data': ['No face found']}

    
        (x,y,w,h) = faces[0]
        crop = img[y:y+h,x:x+w] # cropped image in 3 color channels
    
    else:
        height, width, _ = img.shape
        crop = img[0:height, 0:width]  

    new_img = crop
    img_shape= 224
    input_details = maskInterpreter.get_input_details()

    output_details = maskInterpreter.get_output_details()
    new_img = cv2.resize(crop,(img_shape, img_shape)).astype("float32")
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


