from matplotlib import pyplot as plt
from scipy.signal import savgol_filter
import csv

#Cast les variations en float
def getFloatValue(stringValue):
    split = stringValue.split("-")

    if len(split) == 1:
        if len(split[0]) > 6:
            splitValue = split[0].split(" ")
            return float(splitValue[0])
        else:
            return float(split[0])

    if len(split[1]) > 6:
        splitValue = split[1].split(" ")
        return -float(splitValue[0])
    else:
        return -float(split[1])


#Affiche les données dans un graphique
def plotData(dates, seaLevels):
    plt.plot(dates, seaLevels)

    smooth = savgol_filter(seaLevels, 51, 2)
    plt.plot(dates, smooth, color='red')

    plt.title("Global sea level variation from 1993")
    plt.xlabel("Dates")
    plt.ylabel("Sea level variations")
    plt.show()


#Ouvre le fichier de données et les ré-arrange
#with open("global_sea_lvl_nasa_db.csv", newline="") as f:
    #dates = []
    #seaLevels = []

    #lire = csv.reader(f, delimiter=";")
    #for ligne in lire:
        #dates.append(float(ligne[3]))
        # seaLevels.append(getFloatValue(ligne[6]))

    #Ajout de la prédiction
    #dates.append(2100)
    #seaLevels.append(max(seaLevels) + 600)

    #Récupération de la variation la plus basse
    #minSeaLevel = min(seaLevels)

    #Ajustement des valeurs en positif
    #for i in range(0,len(dates)):
        #seaLevels[i] = seaLevels[i] - minSeaLevel

    #print(dates[0])
    #print(seaLevels[0])

    #print(dates[int(len(seaLevels) / 2)])
    #print(seaLevels[int(len(seaLevels) / 2)])

    #print(dates[len(seaLevels)-1])
    #print(seaLevels[len(seaLevels)-1])
    #plotData(dates, seaLevels)

def predictionWithoutChanges(date):
    x = date - 1993
    return -0.0259 * pow(x, 2) + 4.2196 * x

def predictionWithBadChanges(date):
    x = date - 1993
    return -0.00714 * pow(x, 2) + 3.95714 * x

with open("sea-level-predictions.csv", "w", newline="") as csvfile:
    columnLabel = ["date", "predNoCh", "predBadCh"]
    writer = csv.DictWriter(csvfile, fieldnames=columnLabel)
    writer.writeheader()

    initialWithoutChanges = predictionWithoutChanges(2020)
    initialWithBadChanges = predictionWithBadChanges(2020)

    for date in range(2020, 2101):
        prediction = predictionWithoutChanges(date) - initialWithoutChanges
        badPrediction = predictionWithBadChanges(date) - initialWithBadChanges

        writer.writerow({"date": date, "predNoCh": prediction, "predBadCh": badPrediction})