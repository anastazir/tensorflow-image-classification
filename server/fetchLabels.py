from constants import dog_breeds_labels, birds_names_labels, food_labels, wildlife_labels, flowers_name_labels, animal_labels

def getLabels(labelsType):
    if labelsType == 'dogClassification':
        return dog_breeds_labels
    elif labelsType == 'birdsClassification':
        return birds_names_labels
    elif labelsType == 'foodClassification':
        return food_labels
    elif labelsType == 'catvsDog':
        return ['Cat', 'Dog']
    elif labelsType == 'emotionClassification':
        return ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    elif labelsType == 'wildlifeClassification':
        return wildlife_labels
    elif labelsType == 'ageClassification':
        return ['0-5', '19-30', '31-50', '51-65', '6-18', '66-100']
    elif labelsType == 'flowerClassification':
        return flowers_name_labels
    elif labelsType == 'animalClassification':
        return animal_labels
    return ['Lables not avialable']