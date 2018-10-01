# AC41004-Team-12-W3rld
A repo for a student project creating a better way to visualise data

[Link to Github](https://github.com/JAStrachan/AC41004-Team-12-W3rld)

## Introduction
Hello! This is the developer’s manual for the Team 12’s time series data pop up card! If you want a good example from us we would suggest looking at demo.html as its simpler than index.html. It’s good to note that inside both we have functions that fake the continuous stream of data by setting an interval that gives more of the data we’ve loaded every time. 

## How to adapt an SVG icon so its fill level can be manipulated
Open your svg file in a text editor

Scroll down till you find a line starting with this:

```
<linearGradient
```

Delete all lines below and including this line till you reach a line starting with this:	

```
</linearGradient>
```

Replace this segment of code with the following:
 
```
<linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
  <stop offset="0%" stop-opacity="1" stop-color="#D40000"/>
  <stop offset="40%" class="level" stop-opacity="1" stop-color="#D40000">
      <animate attributeName="offset" from="0" to="0.4" repeatCount="1" dur="1s" begin="0s"/>
  </stop>
  <stop offset="40%"  class="level" stop-opacity="1" stop-color="white">
	  <animate attributeName="offset" class="levelAnim" from="0" to="0.4" repeatCount="1" dur="1s" begin="0s"/>
	</stop>
</linearGradient>
```

Scroll down till you find a line similar to this:

```
style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
```

Replace the segment of code with the following:

```
fill="url(#lg)"
```

This sets the fill of your shape you selected to match the colours described in the <linearGradient> with the id lg you inserted in the previous step

Open your svg file in your browser

If the fill percentage isn’t working as planned undo the replacement code for the above step and redo the steps for the next instance of a line similar to this: 

```
style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
```

## How to add a new measurement type
You can implement a new measurement type by creating a new instance of Measurement

```javascript
let humidity = new Measurement("%", "SVG/humidity.svg", 0, 100, "Humidity");
```

Where the first parameter is the units, the second parameter is the path to the SVG icon, the third and fourth parameters are the lower and upper limits respectively of the range to show in the SVG fill level and the last parameter is the name of the measurement type.

The Measurement class can also be inherited to allow for adding more fields and functions.

```javascript
class Temperature extends Measurement {
    constructor(units, svgPath, rangeMin, rangeMax, title, yourParam) {
        super(units, svgPath, rangeMin, rangeMax, title);
        this.yourParam = yourParam;
    }

    yourFunction() {
        // your code here
    }
}
```

This child class can then be instantiated in the same way as before

```javascript
let temperature = new Temperature("K", "SVG/thermometer.svg", 283, 303, "Temperature");
```

## How to load in a dataset to use in a marker
The datasets used to generate the marker and popup are in the form of an array of Reading instances where the first items in the array are the oldest readings. Each Reading instance requires a date, a time and a value for the sensor reading. 

```javascript
class Reading{
   constructor(date, time, reading){
        this.date = date;
        this.time = time;
        this.reading = reading;
    }
}
```

## How to add a marker to the map
First, a MarkerController needs to be added to the page so that it can store a list of all the markers on the page.

```javascript
let temperatureMarkerController = new WrldMarkerController(map);
```

Then the addSensor() function can be called to add a new marker corresponding to a sensor

```javascript
addSensor(0, temperatureMarkerController, "westport_house", 0, [56.460102, -2.978278], temperature, temperatureData);
```

The parameters are as follows: the marker ID, the MarkerController, the id of the indoor map, the floor-index of the map, the co-ordinates of the marker, the instance of Measurement created earlier and the array of Reading instances containing temperature sensor readings.

## How to update a marker on the map
Whenever the dataset is updated call the updateSensor() function, passing in the MarkerController and the updated dataset. 

```javascript
updateSensor(temperatureMarkerController, temperatureData);
```

This will update the values on all the markers controlled by the marker controller as well as changing the values displayed on the popup, the fill level of the popup SVG icon and adding an extra point to the graph.

## Notes for extending this project
We currently use chart.js as our graphing library. If you want to change (some people feel strongly against one of its dependencies Moment.js) feel free to. Simply change the graph.js file. As long as you have the methods createGraph() and updateGraph() you shouldn’t need to change anything. 

If you want to change the number of readings displayed in the graph you can change the value given to NUMBER_OF_READINGS at the top of card.js. We simply choose 12 as it looks nice and since our fake data was per the hour it was ½ a day.
