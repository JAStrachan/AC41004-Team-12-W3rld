function expandCard()
{
    // Since binded to class when called, this refers to card class
    if(!this.expanded) {
        this.expanded = true;

        this.flipArrow("225deg", this.arrow);

        this.arrow.style.marginTop = "5px";

        // expand card
        this.cardDiv.style.height = "calc(var(--card-height-expanded) + var(--graph-height))";
        this.cardDiv.style.width = "var(--card-width-expanded)";

        // loading graph for sensor
        let graph = new Graph(this.sensorData);
        graph.createGraph();
    }
    else {
        this.expanded = false;

        this.flipArrow("45deg", this.arrow);
        this.arrow.style.marginTop = "0px";

        // shrink card
        this.cardDiv.style.height = "";
        this.cardDiv.style.width = "var(--card-width)";
    }
}

class Card {

    constructor(units, svgPath, sensorData) {
        this.lastReading = convert("C", sensorData[sensorData.length - 1].reading);
        this.lastTime = sensorData[sensorData.length - 1].time;
        this.lastDate = sensorData[sensorData.length - 1].date;
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

		tempAndTimeContainer.className = "flexcontainer tempAndTimeContainer";
        tempAndTimeContainer.id = "popupCard";

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
        this.svgIcon.id = "svgIcon";
        this.svgIcon.data = this.svgPath;
        this.svgIcon.className = "svgIcon";

        iconDiv.appendChild(this.svgIcon);
        return iconDiv;
    }

    updateCardFromSlider(param) {
        updateCard(document.getElementById("popupCard"), param.target.sensorReadings);
    }

    getSliderDiv()
    {
        // create div to store slider
        let sliderDiv = document.createElement("div");
        sliderDiv.className = "slidercontainer";

        // add slider to div
        let slider = document.createElement("input");
        slider.type = "range";
        slider.id = "cardSlider";
        slider.className = "slider";
        slider.min = "1";
        slider.max = "12";
        slider.value = "12";
        slider.step = "1";
        slider.addEventListener("input", this.updateCardFromSlider);
        slider.sensorReadings = this.sensorData;
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
