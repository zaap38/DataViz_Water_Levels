from matplotlib import pyplot as plt
from scipy.signal import savgol_filter
import csv

def predictionWithoutChanges(date):
    x = date - 1993
    return (5.95 / 196) * pow(x, 2) + (461280 / 134400) * x

def predictionWithWorstChanges(date):
    x = date - 1993
    return ((54 - 14 * (108480 / 134400)) / 196) * pow(x, 2) + (108480 / 134400) * x

def predictionWithGoodChanges(date):
    x = date - 1993
    return (95.1 / 27) * x

with open("sea-level-predictions.csv", "w", newline="") as csvfile:
    columnLabel = ["date", "predNoCh", "predWorstCh", "predGoodCh"]
    writer = csv.DictWriter(csvfile, fieldnames=columnLabel)
    writer.writeheader()

    initialWithoutChanges = predictionWithoutChanges(2020)
    initialWithWorstChanges = predictionWithWorstChanges(2020)
    initialWithGoodChanges = predictionWithGoodChanges(2020)

    dates = []
    predNoCh = []
    predWorstCh = []
    predGoodCh = []

    for date in range(2020, 2301):
        prediction = predictionWithoutChanges(date) - initialWithoutChanges
        worstPrediction = predictionWithWorstChanges(date) - initialWithWorstChanges
        goodPrediction = predictionWithGoodChanges(date) - initialWithGoodChanges

        writer.writerow({"date": date, "predNoCh": prediction, "predWorstCh": worstPrediction, "predGoodCh": goodPrediction})

        #dates.append(date)
        #predNoCh.append(prediction)
        #predWorstCh.append(worstPrediction)
        #predGoodCh.append(goodPrediction)

    #smoothPredNoCh = savgol_filter(predNoCh, 51, 2)
    #plt.plot(dates, smoothPredNoCh)
    #smoothPredWorstCh = savgol_filter(predWorstCh, 51, 2)
    #plt.plot(dates, smoothPredWorstCh, color='red')
    #smoothPredGoodCh = savgol_filter(predGoodCh, 51, 2)
    #plt.plot(dates, smoothPredGoodCh, color='green')

    #plt.title("sea level predictions from 1993")
    #plt.xlabel("Dates")
    #plt.ylabel("Sea level predictions")
    #plt.show()