import cv2
import numpy as np

from loadModels import catVsDogInterpreter

def catOrDogClassification(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The predictions in a JSON fromat.
    """
    img_size= 224
    input_details = catVsDogInterpreter.get_input_details()
    output_details = catVsDogInterpreter.get_output_details()
    new_img = cv2.resize(img,(img_size, img_size)).astype("float32")
    new_img = np.reshape(new_img,[1, img_size, img_size, 3])/225.0


    catVsDogInterpreter.allocate_tensors()
    catVsDogInterpreter.set_tensor(input_details[0]['index'], new_img)
    catVsDogInterpreter.invoke()
    pred = catVsDogInterpreter.get_tensor(output_details[0]['index'])
    if pred[0].argmax() == 0:
        return {'data': 'Cat'}
    else:
        return {'data': 'Dog'} 