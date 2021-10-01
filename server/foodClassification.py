import cv2
import tensorflow as tf
import numpy as np

from constants import food_labels

foodClassification = tf.keras.models.load_model('./models/foodClassification.h5') # input shape of (224, 224, 3)

def foodClassificationURL(img):
    ans= []
    new_img = cv2.resize(img,(224, 224))
    new_img = np.reshape(new_img,[1, 224, 224, 3])
    pred = foodClassification.predict(new_img)
    # print('---------------------pred[0]',pred[0])
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{food_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal palces
    print(ans)
    return {'data': ans}
