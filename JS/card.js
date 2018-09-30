const NUMBER_OF_READINGS = 12;

// expands the popup to show the graph
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

// calls the updateCard function when the slider is moved
function updateCardFromSlider() {
    updateCard(this.sensorData, this.measurement);
}

// gets a page worth of readings. The number of readings in a page can be changed by editing NUMBER_OF_READINGS
function getSliceOfSensorReadings(sensorData,placement)
{
    let dataToDisplay = [];
    let startingIndex = placement - NUMBER_OF_READINGS;
    let endIndex = placement;

    //push data onto array, get oldest first
    do{
        dataToDisplay.push(sensorData[startingIndex]);
        startingIndex++;
    }
    while(startingIndex < endIndex)
    return dataToDisplay;
}

// loads the graph of  the previous page worth of readings
function getPrevDayGraph(){
    let newIndex = this.placement - NUMBER_OF_READINGS;
    if(newIndex <= 0 || newIndex < NUMBER_OF_READINGS)
    {
        this.placement = NUMBER_OF_READINGS;
    }
    else{
        this.placement = newIndex;
    }
    updateGraph(this.graph,this.sensorData, this.placement);
    this.updateLeftGraphArrow();
    this.updateRightGraphArrow();
}

// loads the graph of  the next page worth of readings
function getNextDayGraph(){
    let newIndex = this.placement + NUMBER_OF_READINGS;
    if(newIndex > this.sensorData.length)
    {
        this.placement = this.sensorData.length;
    }
    else{
        this.placement = newIndex;
    }
    updateGraph(this.graph,this.sensorData, this.placement);
    this.updateLeftGraphArrow();
    this.updateRightGraphArrow();
}

// updates the graph on the page with the new slice of data
function updateGraph(graph,sensorData,placement){
    let newSensorData = getSliceOfSensorReadings(sensorData, placement);
    graph.updateGraph(newSensorData);

}

// class that creates a card that contains the data to be displayed in the popup
class Card {
    constructor(measurement, sensorData) {
        this.lastReading = sensorData[sensorData.length - 1].reading;
        this.lastTime = sensorData[sensorData.length - 1].time;
        this.lastDate = sensorData[sensorData.length - 1].date;
        this.units = measurement.units;
        this.measurement = measurement;
        this.expanded = false;
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";
        this.svgIcon = null;
        this.arrow = null;
        this.svgPath = measurement.svgPath;
        this.sensorData = sensorData;
        this.placement = sensorData.length;
        this.graph = new Graph(getSliceOfSensorReadings(this.sensorData,this.placement));
    }


    // returns the whole card in the form of a div
    getDiv() {
		let tempAndTimeContainer = document.createElement("div");

		tempAndTimeContainer.className = "flexcontainer tempAndTimeContainer";
        tempAndTimeContainer.id = "popupCard";

        let titleDiv = this.getTitleDiv();
        tempAndTimeContainer.appendChild(titleDiv);

        let sensorReadingDiv = this.getSensorReadingDiv();

        tempAndTimeContainer.appendChild(sensorReadingDiv);

        let sliderDiv = this.getSliderDiv();
        tempAndTimeContainer.appendChild(sliderDiv);

        let TimeDiv = this.getTimeDiv();
        tempAndTimeContainer.appendChild(TimeDiv);

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

    // returns the div containing the name of the measurement type
    getTitleDiv()
    {
        let titleDiv = document.createElement("div");
        titleDiv.className = "titleDiv";
        let title = document.createElement("span");
        title.className = "title";
        title.textContent = this.measurement.title;
        titleDiv.appendChild(title);
        return titleDiv;
    }

    // returns a div containing the current reading and its appropriate units
    getSensorReadingDiv()
    {
        // create div to store the value
        let sensorReadingDiv = document.createElement("div");
        sensorReadingDiv.className = "value";
        let value = document.createElement("span");
        value.id = "valueText";
        value.className = "value";
        value.textContent = this.lastReading;
        let unitText = document.createElement("span");
        unitText.id = "unitText";
        unitText.className = "value";
        unitText.textContent = this.units;
        sensorReadingDiv.appendChild(value);
        sensorReadingDiv.appendChild(unitText);
        return sensorReadingDiv;
    }

    // returns a div displaying the current time and date
    getTimeDiv()
    {
        let TimeDiv = document.createElement("div");
        TimeDiv.id = "timeDateText";
        TimeDiv.className = "time";
        TimeDiv.textContent = this.lastDate + " " + this.lastTime;
        return TimeDiv;
    }

    // returns the div containing the svg icon
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

    // returns the div containing the slider to go back 12 readings
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
        slider.addEventListener("input", updateCardFromSlider.bind(this));
        slider.sensorReadings = this.sensorData;
        sliderDiv.appendChild(slider);

        this.slider = slider;

        return sliderDiv;
    }

    // returns the blank canvas that the graph will appear in
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

    // returns the button used to expand the popup
    getButtonDiv()
    {
        // create div to store expand/contract button
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "button";
        this.arrow = this.getArrow();
        buttonDiv.appendChild(this.arrow);
        buttonDiv.addEventListener("click", expandCard.bind(this));
        return buttonDiv;
    }

    // returns the arrow icon used in the buttons
    getArrow()
    {
        let arrow = document.createElement("i");
        arrow.className = "arrow";
        return arrow;
    }

    // checks if there are any previous readings to make a graph page from
    prevReadingsAvailable()
    {
        let bool = true;
        if(this.placement == 0 || this.placement == NUMBER_OF_READINGS){
           bool = false;
        }
        return bool;
    }

    // checks if there are any future readings to make a graph page from
    nextReadingsAvailable()
    {
        let bool = true;
        if(this.placement == this.sensorData.length){
           bool = false;
        }
        return bool;
    }

    // sets the left arrow button as grey and unclickable if there arent any previous readings
    updateLeftGraphArrow(){
        let arrowLeftDiv = document.getElementById('arrowLeftDiv');
        let arrowLeft = document.getElementById('arrowLeft');

        this.toggleLeftGraphButton(arrowLeftDiv,arrowLeft);
    }

    // sets the right arrow button as grey and unclickable if there arent any previous readings
    updateRightGraphArrow(){
        let arrowRightDiv = document.getElementById('arrowRightDiv');
        let arrowRight = document.getElementById('arrowRight');

        this.toggleRightGraphButton(arrowRightDiv,arrowRight);
    }

    // sets the left arrow button as grey and unclickable if there arent any previous readings
    toggleLeftGraphButton(arrowLeftDiv, arrowLeft){
        if(this.prevReadingsAvailable()){
            arrowLeftDiv.className = 'button';
            arrowLeft.style.borderColor = 'black';
            arrowLeftDiv.style.pointerEvents = 'auto';
        }
        else{
            arrowLeftDiv.classname = 'disabledButton';
            arrowLeft.style.borderColor ='#adb0b5';
            arrowLeftDiv.style.pointerEvents = 'none';
        }
    }

    // sets the right arrow button as grey and unclickable if there arent any previous readings
    toggleRightGraphButton(arrowRightDiv, arrowRight){
        if(this.nextReadingsAvailable()){
            arrowRightDiv.className = 'button';
            arrowRight.style.borderColor = 'black';
            arrowRightDiv.style.pointerEvents = 'auto';
        }
        else{
            arrowRightDiv.classname = 'disabledButton';
            arrowRight.style.borderColor ='#adb0b5';
            arrowRightDiv.style.pointerEvents = 'none';
        }
    }

    // returns the div containing the left arrow button for the graph
    getArrowGraphPrevDiv()
    {
        let arrowLeft = this.getArrow();
        arrowLeft.id = "arrowLeft"
        let arrowLeftDiv = document.createElement('div');
        arrowLeftDiv.id = 'arrowLeftDiv';

        this.toggleLeftGraphButton(arrowLeftDiv,arrowLeft);
        arrowLeftDiv.addEventListener("click",getPrevDayGraph.bind(this));

        arrowLeftDiv.appendChild(arrowLeft);
        return arrowLeftDiv;
    }

    // returns the div containing the left arrow button for the graph
    getArrowGraphNextDiv()
    {
        let arrowRight = this.getArrow();
        arrowRight.id = "arrowRight";
        let arrowRightDiv = document.createElement('div');
        arrowRightDiv.id = 'arrowRightDiv';

        this.toggleRightGraphButton(arrowRightDiv,arrowRight);
        arrowRightDiv.addEventListener("click",getNextDayGraph.bind(this));

        arrowRightDiv.appendChild(arrowRight);
        return arrowRightDiv;
    }

    // rotates the arrow on the expand card button when it is pressed
    flipArrow(rotation, arrow)
    {
        arrow.style.transform = "rotate("+ rotation + ")";
    }

    // returns the div that contains both of the arrows that control the graph navigation
    getGraphControlDiv(){
        let graphButtonDiv = document.createElement("div");
        graphButtonDiv.className = "graphButtonsDiv";
        let arrowPrev = this.getArrowGraphPrevDiv();
        graphButtonDiv.appendChild(arrowPrev);
        let arrowNext = this.getArrowGraphNextDiv();
        graphButtonDiv.appendChild(arrowNext);
        return graphButtonDiv;
    }
}
