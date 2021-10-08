from constants import dog_breeds_labels, birds_names_labels, food_labels, wildlife_labels

def getLabels(labelsType):
    if labelsType == 'dogClassification':
        return dog_breeds_labels
    elif labelsType == 'birdsClassification':
        return birds_names_labels
    elif labelsType == 'foodClassification':
        return food_labels
    elif labelsType == 'catvsDog':
        return ['Images of cats', 'Images of dogs']
    elif labelsType == 'emotionClassification':
        return ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    elif labelsType == 'wildlifeClassification':
        return wildlife_labels
    return ['Lables not avialable']