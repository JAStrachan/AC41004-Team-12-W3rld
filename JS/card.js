const NUMBER_OF_READINGS = 12;

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
        
        this.graph.createGraph();

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

function getDayOfSensorData(sensorData,placement)
{
    let dataToDisplay = [];
    let startingIndex= placement - NUMBER_OF_READINGS;
    let endIndex = placement;
    
    //push data onto array, get oldest first
    do{
        dataToDisplay.push(sensorData[startingIndex]);
        startingIndex++;
        console.log(startingIndex);
    }
    while(startingIndex <= endIndex)
    console.log(dataToDisplay);
    return dataToDisplay;

}

function getPrevDayGraph(){
    let newIndex = this.placement + NUMBER_OF_READINGS;
    if(newIndex < this.sensorData.length && newIndex >= 0)
    {
        this.placement += NUMBER_OF_READINGS;
        updateGraph(this.graph,this.sensorData, this.placement);
    } 
}

function getNextDayGraph(){
    let newIndex = this.placement - NUMBER_OF_READINGS;
    if(newIndex < this.sensorData.length && newIndex >= 0)
    {
        this.placement -= NUMBER_OF_READINGS;
        updateGraph(this.graph,this.sensorData,this.placement);
    } 
}

function updateGraph(graph,sensorData,placement){
    console.log('Hit update graph');
    console.log(sensorData);
    let newSensorData = getDayOfSensorData(sensorData, placement);
    graph.updateGraph(newSensorData);
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
        this.placement = sensorData.length -1;
        this.prevPlacement = this.placement;
        this.graph = new Graph(getDayOfSensorData(this.sensorData,this.placement));
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

        let graphControlDiv = this.getGraphControlDiv();
        this.cardDiv.appendChild(graphControlDiv);


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
        let arrow = document.createElement("i");
        arrow.className = "arrow";
        return arrow;
    }

    getArrowGraphPrevDiv()
    {
        let arrowLeft = this.getArrowDiv();
        arrowLeft.id = "arrowLeft"
        arrowLeft.addEventListener("click",getPrevDayGraph.bind(this));
        return arrowLeft;
    }

    getArrowGraphNextDiv()
    {
        let arrowRight = this.getArrowDiv();
        arrowRight.id = "arrowRight";
        arrowRight.addEventListener("click",getNextDayGraph.bind(this));
        return arrowRight;
    }


    flipArrow(rotation, arrow)
    {
        arrow.style.transform = "rotate("+ rotation + ")";
    }

    getGraphControlDiv(){
        let graphButtonDiv = document.createElement("div");
        graphButtonDiv.className = "graphButtons";
        let arrowPrev = this.getArrowGraphPrevDiv();
        graphButtonDiv.appendChild(arrowPrev);
        let arrowNext = this.getArrowGraphNextDiv();
        graphButtonDiv.appendChild(arrowNext);
        return graphButtonDiv;
    }
}
