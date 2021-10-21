import cv2
import tensorflow as tf
import numpy as np

from constants import flowers_name_labels

flowerMode = tf.keras.models.load_model('./models/flower299NASnet244(76).h5') # input shape of (224, 224, 3)




def flowerClassificationURL(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The top three predictions in a JSON fromat.
    """
    img_size= 224
    ans= []
    new_img = cv2.resize(img,(img_size, img_size))
    new_img = np.reshape(new_img,[1, img_size, img_size, 3])/255.0
    pred = flowerMode.predict(new_img)
    # print('---------------------pred[0]',pred[0])
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{flowers_name_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal palces
    print(ans)
    return {'data': ans}

