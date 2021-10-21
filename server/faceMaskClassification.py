import cv2
import numpy as np


face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
from loadModels import masknet

def maskClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples

    new_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR) #colored output image
    if len(faces)==0:
        print('no faces were found')
        return  {'data': "No faces were found"}
    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = new_img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(224,224))
        crop = np.reshape(crop,[1,224,224,3])/255.0
        pred = masknet.predict(crop)
        print('---------------------pred[0]',pred[0])
        # break                   # only predict for the first face
        if pred[0][1]<0.5:
            print ('Mask')
            return {'data':"Mask"}
        else:
            print ('No Mask')
            return {'data':'No Mask'}
    return urlPredSecondOption(new_img, 128)


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

