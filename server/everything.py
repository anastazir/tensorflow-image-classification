import cv2
import tensorflow as tf
import numpy as np

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')



masknet = tf.keras.models.load_model('./models/masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('./models/GenderModal.h5') # input shape of (150, 150, 3)
emotionClassification = tf.keras.models.load_model('./models/emotionDetection.h5') # input shape of (48, 48, 1)   
glassesModel = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (160, 160, 3)


def everythingURL(img):
    ans=[]
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_model.detectMultiScale(img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples
    print('------------------no of face', len(faces))

    if len(faces)==0:return{'data': ['No face found']}

    for i in range(len(faces)):  # for emotion classification'
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(48,48))
        crop = np.reshape(crop,[1,48,48,1])/255.0
        pred = emotionClassification.predict(crop)
        print('---------------------pred[0]',pred)
        ans.append(emotion_labels[pred.argmax()])
        break
        
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(150,150))
        crop = np.reshape(crop,[1,150,150,3])/255.0
        pred = genderModel.predict(crop)
        break
    if pred[0][1]<0.5:
        ans.append('Female')
    else:
        ans.append('Male')

    for i in range(len(faces)):
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(128,128))
        crop = np.reshape(crop,[1,128,128,3])/255.0
        pred = masknet.predict(crop)
        break                   # only predict for the first face
    if pred[0][1]<0.5:
        ans.append('Mask')
    else:
        ans.append("No Mask")

    for i in range(len(faces)):
        print('------------------found face')
        (x,y,w,h) = faces[i]
        crop = img[y:y+h,x:x+w]
        crop = cv2.resize(crop,(160,160))
        crop = np.reshape(crop,[1,160,160,3])
        pred = glassesModel.predict(crop)
        print('---------------------pred[0]',pred[0])
        # break                   # only predict for the first face
        if pred[0][0]>0:
            ans.append("No Glasses")
        else:
            ans.append('Glasses')
        break
    return{'data': ans}