from constants import *

CLASSIFICATIONS = {
    "catvsDog": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "faceMaskClassification": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "genderClassification": {
        "img_size"   : 150,
        "normalize"  : True,
    },
    "emotionClassification": {
        "img_size"   : 48,
        "normalize"  : True,
    },
    "glassesClassification":{
        "img_size"   : 160,
        "normalize"  : False
    },
    "ageClassification": {
        "img_size"   : 160,
        "normalize"  : True,
    },
    "foodClassification":{
        "img_size"   : 224,
        "normalize"  : True,
    },
    "dogClassification": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "birdsClassification": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "wildlifeClassification": {
        "img_size"   : 224,
        "normalize"  : False, 
    },
    "landmarkClassification": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "flowerClassification": {
        "img_size"   : 224,
        "normalize"  : True,
    },
    "animalClassification": {
        "img_size"   : 160,
        "normalize"  : True,
    },
}

MODEL_LOCATIONS = {
    "catvsDog"               : "./models_quantized/catVsDogMobilenetv224_quantized.tflite",
    "faceMaskClassification" : "./models_quantized/faceMaskClassificationNasNetModel224_quantized.tflite",
    "genderClassification"   : "./models_quantized/GenderModal_quantized.tflite",
    "emotionClassification"  : "./models_quantized/emotionDetection_quantized.tflite",
    "glassesClassification"  : "./models_quantized/glassesDetection_quantized.tflite",
    "ageClassification"      : "./models_quantized/ageClassificationNasNetModel160_quantized.tflite",
    "foodClassification"     : "./models_quantized/foodClassificationMobilenetv2_quantized.tflite",
    "dogClassification"      : "./models_quantized/dogClassificationMobileNet224(78)_quantized.tflite",
    "birdsClassification"    : "./models_quantized/birdClassificationNasNetModel224_quantized.tflite",
    "wildlifeClassification" : "./models_quantized/oregonWildlife224(92)_quantized.tflite",
    "landmarkClassification" : "./models_quantized/landMarks224_quantized.tflite",
    "flowerClassification"   : "./models_quantized/flower299MobileNet244(76)_quantized.tflite",
    "animalClassification"   : "./models_quantized/animalClassification160_quantized.tflite",
}

LABELS = {
    "catvsDog"               : None,
    "faceMaskClassification" : None,
    "genderClassification"   : None,
    "emotionClassification"  : None,
    "glassesClassification"  : None,
    "ageClassification"      : None,
    "foodClassification"     : food_labels,
    "dogClassification"      : dog_breeds_labels,
    "birdsClassification"    : birds_names_labels,
    "wildlifeClassification" : wildlife_labels,
    "landmarkClassification" : landmark_labels,
    "flowerClassification"   : flowers_name_labels,
    "animalClassification"   : animal_labels,
}

MULTIPLE_CLASSES = {
    "catvsDog"               : False,
    "faceMaskClassification" : False,
    "genderClassification"   : False,
    "emotionClassification"  : False,
    "glassesClassification"  : False,
    "ageClassification"      : False,
    "foodClassification"     : True,
    "dogClassification"      : True,
    "birdsClassification"    : True,
    "wildlifeClassification" : True,
    "landmarkClassification" : True,
    "flowerClassification"   : True,
    "animalClassification"   : True,
}