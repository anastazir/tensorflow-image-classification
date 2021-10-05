from constants import dog_breeds_labels



def getLabels(labelsType):
    if labelsType == 'dogClassification':
        return dog_breeds_labels
    return 'labels not present'