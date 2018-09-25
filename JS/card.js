function expandCard()
{
    // Since binded to class when called, this refers to card class
    if(!this.expanded) {
        this.expanded = true;

        this.flipArrow("225deg", this.arrow);

        // expand card
        this.cardDiv.style.height = "calc(var(--card-height-expanded) + var(--graph-height))";
        this.cardDiv.style.width = "var(--card-width-expanded)";

        // get svgobject
        let contentDoc = this.svgIcon.contentDocument;
        let percentages = contentDoc.getElementsByClassName("level");;
        let decimals = contentDoc.getElementsByClassName("levelAnim");

        // set new percentages
        for(let i=0; i<percentages.length; i++) {
            percentages[i].setAttribute("offset", "60%");
        }

        // set new animation points
        for(let i=0; i<decimals.length; i++) {
            decimals[i].setAttribute("to", "0.6");
        }

        let dayOfSensorData = getDayOfSensorData(this.sensorData);
        // loading graph for sensor
        let graph = new Graph(dayOfSensorData);
        graph.createGraph();
    }
    else {
        this.expanded = false;

        this.flipArrow("45deg", this.arrow);

        // shrink card
        this.cardDiv.style.height = "";
        this.cardDiv.style.width = "";
    }
}

function getDayOfSensorData(sensorData)
{
    let temp = [];
    let timeLabels= [];

    let checkDate = sensorData[sensorData.length - 1].date;

    let i=sensorData.length-1;

    //push sensor data to an array
    do{
        temp.push(sensorData[i]);
        i--;
    }
    while(sensorData[i].date == checkDate)

    // reverse timelabels
    for(i=temp.length - 1; i>=0; i--)
    {
        timeLabels.push(temp[i]);
    }
    
    return timeLabels;

}

class Card {

    constructor(units,svgPath, sensorData) {
        this.lastReading = convert("C", sensorData[0].reading);
        this.lastTime = sensorData[0].time;
        this.lastDate = sensorData[0].date;
        this.units = units;
        this.expanded = false;
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";
        this.svgIcon = null;
        this.arrow = null;
        this.svgPath=svgPath;
        this.sensorData = sensorData;
    }

    getDiv() {

		let tempAndTimeContainer = document.createElement("div");

		tempAndTimeContainer.className = "flexcontainer value";

        // create div to store the value
        let sensorReadingDiv = document.createElement("div");
        sensorReadingDiv.className = "value valueText";
        sensorReadingDiv.textContent = this.lastReading + this.units;

        tempAndTimeContainer.appendChild(sensorReadingDiv);

        let TimeDiv = this.getTimeDiv();
        tempAndTimeContainer.appendChild(TimeDiv);

        let sliderDiv = this.getSliderDiv();
        tempAndTimeContainer.appendChild(sliderDiv);

        let iconDiv = this.getIconDiv();

        let svgAndTempContainer = document.createElement("div");
        svgAndTempContainer.className = "svgAndTempContainer";
        svgAndTempContainer.appendChild(tempAndTimeContainer);
        svgAndTempContainer.appendChild(iconDiv);

        this.cardDiv.appendChild(svgAndTempContainer);

        let buttonDiv = this.getButtonDiv();
        this.cardDiv.appendChild(buttonDiv);

        let graphDiv = this.getGraphDiv();
        this.cardDiv.appendChild(graphDiv);

        return this.cardDiv;
    }

    // create div to store the time
    getTimeDiv()
    {
        let TimeDiv = document.createElement("div");
        TimeDiv.className = "time timeDateText";
        TimeDiv.textContent = this.lastDate + " " + this.lastTime;
        return TimeDiv;
    }

    getIconDiv()
    {
        // create div to store SVG icon
        let iconDiv = document.createElement("div");
        iconDiv.className = "flexcontainer icon";

        // add svg into iconDiv
        this.svgIcon = document.createElement("object");
        this.svgIcon.type = "image/svg+xml";
        this.svgIcon.data = this.svgPath;
        this.svgIcon.style.height = "100%";
        this.svgIcon.style.width = "100%";

        iconDiv.appendChild(this.svgIcon);
        return iconDiv;
    }

    getSliderDiv()
    {
        // create div to store slider
        let sliderDiv = document.createElement("div");
        sliderDiv.className = "slidercontainer";

        // add slider to div
        let slider = document.createElement("input");
        slider.type = "range";
        slider.id = "range";
        slider.className = "slider";
        slider.min = "1";
        slider.max = "12";
        slider.value = "12";
        slider.step = "1";
        sliderDiv.appendChild(slider);
        return sliderDiv;
    }

    getGraphDiv()
    {
        // create div to store graph
        let graphDiv = document.createElement("div");
        graphDiv.className = "graph";
        let graphCanvas = document.createElement("canvas");
        graphCanvas.id = "graphCanvas";
        graphDiv.appendChild(graphCanvas);
        return graphDiv;
    }

    getButtonDiv()
    {
        // create div to store expand/contract button
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "button";
        this.arrow = this.getArrowDiv();
        buttonDiv.appendChild(this.arrow);
        buttonDiv.addEventListener("click", expandCard.bind(this));
        return buttonDiv;
    }

    getArrowDiv()
    {
        let arrowL = document.createElement("i");
        arrowL.className = "arrow";
        return arrowL;
    }

    flipArrow(rotation, arrow)
    {
        arrow.style.transform = "rotate("+ rotation + ")";
    }
}
