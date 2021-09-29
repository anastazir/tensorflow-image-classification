import cv2
import tensorflow as tf
import numpy as np

from constants import dog_breeds_labels

dogClassification = tf.keras.models.load_model('./models/dogBreedClassfication331.h5') # input shape of (331, 331, 3)


def dogClassificationURL(img):
    ans= []
    new_img = cv2.resize(img,(331, 331))
    new_img = np.reshape(new_img,[1, 331, 331, 3])/225.0
    pred = dogClassification.predict(new_img)
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{dog_breeds_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal palces
    print(ans)
    return {'data': ans}