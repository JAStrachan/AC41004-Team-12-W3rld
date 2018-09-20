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
    console.log((Conversion(mode,tempTime[i].Sensor1)+Conversion(mode,tempTime[i].Sensor2)+Conversion(mode,tempTime[i].Sensor3)+Conversion(mode,tempTime[i].Sensor4))/noOfSensors)
}

function getMostRecent() {

}

function getData(){
    //Initialise sensor arrays
    let sensorReadings = [];
    // let sensorTwoReadings = [];
    // let sensorThreeReadings = [];
    // let sensorFourReadings = [];

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        //If ready to receive data, parse the input
        if(this.readyState == 4 && this.status == 200){
            let response = JSON.parse(xhttp.responseText);
            let tempTime = response.tempTime;
            let output = '';
            //Store readings in array
            for(let i = 0; i < tempTime.length; i++){
                // output += '<li>'+tempTime[i].Sensor1+'</li>';
                sensorReadings.push(new Reading(tempTime[i].Date,tempTime[i].Sensor1));
                // sensorTwoReadings.push(new Reading(tempTime[i].Date,tempTime[i].Sensor2));
                // sensorThreeReadings.push(new Reading(tempTime[i].Date,tempTime[i].Sensor3));
                // sensorFourReadings.push(new Reading(tempTime[i].Date,tempTime[i].Sensor4));

            }
            // document.body.innerHTML = output;
        }
    };
    //Read from data file
    xhttp.open("GET","JSON/TemperatureDataKelvin.json",true);
    xhttp.send();

    console.log(sensorReadings);
    console.log(sensorReadings[1]);
    return sensorReadings;
}

function updateMarkers(markerController) {
    console.log(new Date());
    let markerIds = markerController.getAllMarkerIds();
    for(i=0; i<markerIds.length; i++) {
        markerController.getMarker(markerIds[i]).setIcon(getDataMarkerIcon("100", "°C", "SVG/humidity.svg"));
    }
}
