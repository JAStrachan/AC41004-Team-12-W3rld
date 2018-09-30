class Measurement {
    constructor(units, svgPath, rangeMin, rangeMax, title) {
        this.units = units;
        this.svgPath = svgPath;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
        this.title = title;
    }  
}

class Temperature extends Measurement {
    constructor(units, svgPath, rangeMin, rangeMax, title) {
        super(units, svgPath, rangeMin, rangeMax, title);
    }

    //Takes in input of mode desired to be displayed and converts values to appropriate unit when being displayed
    convert(mode,value) {
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

    setUnits(settings) {
        switch(settings[0]) {
            case "K":
                this.units = "K";
                this.rangeMin = this.convert("K", this.rangeMin);
                this.rangeMax = this.convert("K", this.rangeMax);
                break;
            case "F":
                this.units = "°F";
                this.rangeMin = this.convert("F", this.rangeMin);
                this.rangeMax = this.convert("F", this.rangeMax);
                break;
            case "C":
                this.units = "°C";
                this.rangeMin = this.convert("C", this.rangeMin);
                this.rangeMax = this.convert("C", this.rangeMax);
                break;

            default:
                this.units = "K";
                this.rangeMin = this.convert("K", );
                this.rangeMax = this.convert("K", 283, 303);
                break;
        }
    };

    convertData(sensorData, settings) {
        let tempFormat = settings[0];
        for(let i=0; i<sensorData.length; i++)
        {
            sensorData[i].reading = this.convert(tempFormat, sensorData[i].reading);
        }
        return sensorData;
    };


}
