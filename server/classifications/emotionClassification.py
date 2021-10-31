import cv2
import numpy as np

from loadModels import emotionInterpreter

face_model = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

def emotionClassificationURL(img, isCropped=False):
    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    if not isCropped:
        faces = face_model.detectMultiScale(gray_img,scaleFactor=1.1, minNeighbors=4) #returns a list of (x,y,w,h) tuples
        print('------------------no of face', len(faces))

        if len(faces)==0:return{'data': ['No face found']}

    
        (x,y,w,h) = faces[0]
        crop = gray_img[y:y+h,x:x+w] # cropped image in 3 color channels
    
    else:
        height, width, _ = gray_img.shape
        crop = gray_img[0:height, 0:width]  

    img_shape= 48
    new_img = cv2.resize(crop,(img_shape, img_shape)).astype("float32")
    new_img = np.reshape(new_img,[1, img_shape, img_shape, 3])/255.0


    input_details = emotionInterpreter.get_input_details()
    output_details = emotionInterpreter.get_output_details()
    emotionInterpreter.allocate_tensors()
    emotionInterpreter.set_tensor(input_details[0]['index'], new_img)
    emotionInterpreter.invoke()
    pred = emotionInterpreter.get_tensor(output_details[0]['index'])

    print('---------------------pred[0]',pred[0])
    return  {"data":  f"{emotion_labels[pred.argmax()]}"}