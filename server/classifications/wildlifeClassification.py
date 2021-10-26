import cv2
import numpy as np

from constants import wildlife_labels

from loadModels import wildlifeClassification, wildlifeInterpreter

def wildlifeClassificationURL(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The top three predictions in a JSON fromat.
    """
    input_details = wildlifeInterpreter.get_input_details()
    output_details = wildlifeInterpreter.get_output_details()
    img_size= 224
    ans= []
    new_img = cv2.resize(img,(img_size, img_size)).astype("float32")
    new_img = np.reshape(new_img,[1, img_size, img_size, 3])/225.0
    wildlifeInterpreter.allocate_tensors()
    wildlifeInterpreter.set_tensor(input_details[0]['index'], new_img)
    wildlifeInterpreter.invoke()
    pred = wildlifeInterpreter.get_tensor(output_details[0]['index'])
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{wildlife_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal places
    print(ans)
    return {'data': ans}