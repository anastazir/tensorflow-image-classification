from constants import dog_breeds_labels, birds_names_labels, food_labels

def getLabels(labelsType):
    if labelsType == 'dogClassification':
        return dog_breeds_labels
    elif labelsType == 'birdsClassification':
        return birds_names_labels
    elif labelsType == 'foodClassification':
        return food_labels
    return 'notFound'