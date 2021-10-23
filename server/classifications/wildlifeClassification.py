import cv2
import numpy as np

from constants import wildlife_labels

from loadModels import wildlifeClassification

def wildlifeClassificationURL(img):
    """
    Keyword arguments:
    img(numpy array) -- The array of the image to predict on.
    Return:The top three predictions in a JSON fromat.
    """
    ans= []
    new_img = cv2.resize(img,(224, 224))
    new_img = np.reshape(new_img,[1, 224, 224, 3])
    pred = wildlifeClassification.predict(new_img)
    arr= pred[0]
    arr1=arr.argsort()[-3:][::-1]  #get the top three results
    for i in arr1:
        ans.append(f'{wildlife_labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%') # show upto 2 decimal places
    print(ans)
    return {'data': ans}