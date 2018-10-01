// class to store one reading from the JSON for use in other functions
class Reading{
   constructor(date, time, reading){
        this.date = date;
        this.time = time;
        this.reading = reading;
    }
}

// function used to retrieve all data of a specific measurement type from the JSON
getData = function(kindOfSensor){
    let promise = new Promise(function(resolve, reject) {
        //Initialise sensor arrays
        // let sensorReadings = [];

        let requestURL = "JSON/SensorData.json";
        let request = new XMLHttpRequest();
        //Read from data file

        request.open("GET",requestURL,true);
        request.send();

        request.onload = function(){
            //If ready to receive data, parse the input
            let response = JSON.parse(request.responseText);
            let temperatureTime = response.temperatureTime;
            let sensorReadings = [];
            switch(kindOfSensor){
                case 'temperature':
                    sensorReadings = getTemperatureData(temperatureTime);
                    break;
                case 'humidity':
                    sensorReadings = getHumidityData(temperatureTime);
                    break;
                case 'people':
                    sensorReadings = getPersonData(temperatureTime);
                    break;
                default:
                    sensorReadings = null;
            }

            resolve(sensorReadings);
        }
    });
    return promise;

}

// gets the temperature data from the JSON
getTemperatureData = function(temperatureTime) {
    let sensorReadings = [];
    for(let i = 0; i < temperatureTime.length; i++){
        sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Time, temperatureTime[i].Sensor1));
    }
    return sensorReadings;
}

// gets the humidity data from the JSON
getHumidityData = function(temperatureTime) {
    let sensorReadings = [];
    for(let i = 0; i < temperatureTime.length; i++){
        sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Time, temperatureTime[i].Humidity));
    }
    return sensorReadings;
}

// gets the number of people from the JSON
getPersonData = function(temperatureTime) {
    let sensorReadings = [];
    for(let i = 0; i < temperatureTime.length; i++){
        sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Time, temperatureTime[i].NumberOfPeople));
    }
    return sensorReadings;
}

// loads the user's from the settings JSON
getSettings = function(){
    let promiseSettings = new Promise(function(resolve, reject) {
        //Initialise sensor arrays
        let settingsReadings = [];

        let requestURL = "JSON/Settings.json";
        let request = new XMLHttpRequest();
        //Read from data file

        request.open("GET",requestURL,true);
        request.send();

        request.onload = function(){
            //If ready to receive data, parse the input

            let response = JSON.parse(request.responseText);
            let settings = response.Settings;

            settingsReadings.push(settings[0].TemperatureFormat);
            settingsReadings.push(settings[0].TimeInterval)

            resolve(settingsReadings);
        }
    });
    return promiseSettings;
}
