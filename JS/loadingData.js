class Reading{
   constructor(date, time, temperature, humidity, people){
        this.date = date;
        this.time = time;
        this.temperature = temperature;
        this.humidity = humidity;
        this.people = people;
    }
}

getData = function() {
    let promise = new Promise(function(resolve, reject) {
        //Initialise sensor arrays
        let sensorReadings = [];

        let requestURL = "JSON/SensorData.json";
        let request = new XMLHttpRequest();
        //Read from data file

        request.open("GET",requestURL,true);
        request.send();

        request.onload = function(){
            //If ready to receive data, parse the input

            let response = JSON.parse(request.responseText);
            let temperatureTime = response.temperatureTime;

            for(let i = 0; i < temperatureTime.length; i++){
                sensorReadings.push(new Reading(temperatureTime[i].Date,temperatureTime[i].Time, temperatureTime[i].Sensor1, temperatureTime[i].Humidity, temperatureTime[i].NumberOfPeople));
            }

            resolve(sensorReadings);
        }
    });
    return promise;
}

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
