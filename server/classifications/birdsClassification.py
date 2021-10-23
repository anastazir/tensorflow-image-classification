import cv2
import tensorflow as tf
import numpy as np

from constants import birds_names_labels
from loadModels import birdsClassification, birdsInterpreter

def birdsClassificationURL(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The top three predictions in a JSON fromat.
    """
    img_size= 224
    input_details = birdsInterpreter.get_input_details()
    output_details = birdsInterpreter.get_output_details()
    ans= []
    new_img = cv2.resize(img,(img_size, img_size)).astype("float32")
    new_img = np.reshape(new_img,[1, img_size, img_size, 3])/225.0
    birdsInterpreter.allocate_tensors()
    birdsInterpreter.set_tensor(input_details[0]['index'], new_img)
    birdsInterpreter.invoke()
    pred = birdsInterpreter.get_tensor(output_details[0]['index'])
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{birds_names_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal palces
    print(ans)
    return {'data': ans}