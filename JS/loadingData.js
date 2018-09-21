class Reading{
   constructor(ReadingDate, SensorOneReading){
        this.ReadingDate = ReadingDate;
        this.SensorOneReading = SensorOneReading;
    }
}
//Takes in input of mode desired to be displayed and converts values to appropriate unit when being displayed
function Conversion(mode,value){
    switch(mode){
        //Kelvin
        case "K":
            return value;
        //Fahrenheit
        case "F":
            return (value*1.8)-459.67;
        //Celsius
        case "C":
            return value-273.15;
    }
}

function sensorAverage(mode) {
    //Displays the average temperature of the 4 sensors
    let noOfSensors = 4;
    console.log((Conversion(mode,temperatureTime[i].Sensor1)+Conversion(mode,temperatureTime[i].Sensor2)+Conversion(mode,temperatureTime[i].Sensor3)+Conversion(mode,temperatureTime[i].Sensor4))/noOfSensors)
}

getData = function() {
    var promise = new Promise(function(resolve, reject) {
        //Initialise sensor arrays
        let sensorReadings = [];

        let requestURL = "JSON/TemperatureDataKelvin.json";
        let request = new XMLHttpRequest();
        //Read from data file

        request.open("GET",requestURL,true);
        request.send();

        request.onload = function(){
            //If ready to receive data, parse the input

            let response = JSON.parse(request.responseText);
            let temperatureTime = response.temperatureTime;

            for(let i = 0; i < temperatureTime.length; i++){
                sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Sensor1));
            }

            resolve(sensorReadings);
        }
    });
    return promise;
}

function updateMarkers(markerController) {
    console.log(new Date());
    let markerIds = markerController.getAllMarkerIds();
    for(i=0; i<markerIds.length; i++) {
        markerController.getMarker(markerIds[i]).setIcon(getDataMarkerIcon("100", "°C", "SVG/humidity.svg"));
    }
}
