def topThreeResults(pred, labels):
    ans = []
    arr= pred[0]
    array=array.argsort()[-3:][::-1]
    for i in array:
        ans.append(f'{labels[i].title()}: {float("{0:.2f}".format(arr[i]))*100}%')
