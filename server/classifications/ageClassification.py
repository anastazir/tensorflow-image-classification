import cv2
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

from loadModels import ageInterpreter

def ageClassificationURL(img, isCropped=False):
    age_labels = ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']

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

    img_shape= 160
    new_img = cv2.resize(crop,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])/255.0

    input_details = ageInterpreter.get_input_details()
    output_details = ageInterpreter.get_output_details()
    ageInterpreter.allocate_tensors()
    ageInterpreter.set_tensor(input_details[0]['index'], new_img)
    ageInterpreter.invoke()
    pred = ageInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    return  {"data":  f"{age_labels[pred.argmax()]}"}