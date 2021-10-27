import cv2
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

from loadModels import ageInterpreter

def ageClassificationURL(img):
    age_labels = ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']

    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img_gray,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    img_shape= 160
    if len(faces)==0: return {"data": "No faces were found"}
    print('------------------found face')
    (x,y,w,h) = faces[0]
    new_img = img[y:y+h,x:x+w]
    input_details = ageInterpreter.get_input_details()
    output_details = ageInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])/255.0


    ageInterpreter.allocate_tensors()
    ageInterpreter.set_tensor(input_details[0]['index'], new_img)
    ageInterpreter.invoke()
    pred = ageInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    return  {"data":  f"{age_labels[pred.argmax()]}"}