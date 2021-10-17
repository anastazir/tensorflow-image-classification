import cv2
import tensorflow as tf
import numpy as np

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')



masknet = tf.keras.models.load_model('./models/masknet.h5') # input shape of (128, 128, 3)
genderModel = tf.keras.models.load_model('./models/GenderModal.h5') # input shape of (150, 150, 3)
emotionClassification = tf.keras.models.load_model('./models/emotionDetection.h5') # input shape of (48, 48, 1)   
glassesModel = tf.keras.models.load_model('./models/glassesDetection.h5') # input shape of (160, 160, 3)
ageClassifier = tf.keras.models.load_model('./models/ageXception80.h5') # input shape of (80, 80, 1)   


def everythingURL(img, isCropped=False):
    ans=[]
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    age_labels = ['18-30','40-60','60-98','6-18']
    
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    if not isCropped:

        faces = face_model.detectMultiScale(imgGray,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples
        print('------------------no of face', len(faces))

        if len(faces)==0:return{'data': ['No face found']}

    
        (x,y,w,h) = faces[0]
        cropGray = imgGray[y:y+h,x:x+w] # cropped image in one color channel
        crop = img[y:y+h,x:x+w] # cropped image in 3 color channels
    
    else:
        height, width, _ = img.shape
        cropGray = imgGray[0:height, 0:width]    
        crop = img[0:height, 0:width]  
        
    predImage = cv2.resize(cropGray,(48,48))
    predImage = np.reshape(predImage,[1,48,48,1])/255.0
    pred = emotionClassification.predict(predImage)
    print('---------------------pred[0]',pred)
    ans.append(emotion_labels[pred.argmax()])
    


    predImage = cv2.resize(crop,(150,150))
    predImage = np.reshape(predImage,[1,150,150,3])/255.0
    pred = genderModel.predict(predImage)

    if pred[0][1]<0.5:
        ans.append('Female')
    else:
        ans.append('Male')


    predImage = cv2.resize(crop,(128,128))
    predImage = np.reshape(predImage,[1,128,128,3])/255.0
    pred = masknet.predict(predImage)
    if pred[0][1]<0.5:
        ans.append('Mask')
    else:
        ans.append("No Mask")

    predImage = cv2.resize(crop,(160,160))
    predImage = np.reshape(predImage,[1,160,160,3])
    pred = glassesModel.predict(predImage)
    print('---------------------pred[0]',pred[0])
    if pred[0][0]>0:
        ans.append("No Glasses")
    else:
        ans.append('Glasses')

    predImage = cv2.resize(crop,(80,80))
    predImage = np.reshape(predImage,[1,80,80,3])/255.0
    pred = ageClassifier.predict(predImage)
    print('---------------------pred[0]',pred)
    ans.append(age_labels[pred.argmax()])
    return{'data': ans}