class Reading{
   constructor(date, time, reading){
        this.date = date;
        this.time = time;
        this.reading = reading;
    }
}
//Takes in input of mode desired to be displayed and converts values to appropriate unit when being displayed
function convert(mode,value){
    switch(mode){
        //Kelvin
        case "K":
            return Math.round(value*100)/100;
        //Fahrenheit
        case "F":
            return Math.round((value*1.8-459.67)*100) / 100;
        //Celsius
        case "C":
            return Math.round((value-273.15) * 100) / 100;
    }
}

function sensorAverage(mode) {
    //Displays the average temperature of the 4 sensors
    let noOfSensors = 4;
    console.log((convert(mode,temperatureTime[i].Sensor1)+convert(mode,temperatureTime[i].Sensor2)+convert(mode,temperatureTime[i].Sensor3)+convert(mode,temperatureTime[i].Sensor4))/noOfSensors)
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
                sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Time, temperatureTime[i].Sensor1));
            }

            resolve(sensorReadings);
        }
    });
    return promise;
}
