import cv2
import numpy as np

from loadModels import glassesModel, glassesInterpreter

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def glassesClassificationURL(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    img_shape= 160
    if len(faces)==0: return {"data": "No faces were found"}
    print('------------------found face')
    (x,y,w,h) = faces[0]
    new_img = new_img[y:y+h,x:x+w]
    img_shape= 160
    input_details = glassesInterpreter.get_input_details()
    output_details = glassesInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])


    glassesInterpreter.allocate_tensors()
    glassesInterpreter.set_tensor(input_details[0]['index'], new_img)
    glassesInterpreter.invoke()
    pred = glassesInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    if pred[0] > 0:
        print ('No Glasses')
        return {'data':'No Glasses'}
    else:
        print ('Glasses')
        return {'data':"Glasses"}