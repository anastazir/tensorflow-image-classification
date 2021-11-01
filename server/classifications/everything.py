from classifications.faceMaskClassification import maskClassification
from classifications.genderClassification   import genderClassification
from classifications.emotionClassification  import emotionClassificationURL
from classifications.glassesClassification  import glassesClassificationURL
from classifications.ageClassification      import ageClassificationURL

def everythingURL(img, isCropped=False):
    ans=[]
    maskResult= maskClassification(img, isCropped=isCropped)
    ans.append(maskResult['data'])
    print('-------------------maskClassification')
    maskResult= genderClassification(img, isCropped=isCropped)
    ans.append(maskResult['data'])
    print('-------------------genderClassification')
    # maskResult= emotionClassificationURL(img, isCropped=isCropped)
    # ans.append(maskResult['data'])
    maskResult= glassesClassificationURL(img, isCropped=isCropped)
    ans.append(maskResult['data'])
    print('-------------------glassesClassificationURL')
    maskResult= ageClassificationURL(img, isCropped=isCropped)
    ans.append(maskResult['data'])
    print('-------------------ageClassificationURL')
    return{'data': ans}