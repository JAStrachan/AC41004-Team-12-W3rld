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

        // loading graph for sensor
        let graph = new Graph();
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

class Card {

    constructor(value) {
        this.value = value;
        this.expanded = false;
        this.cardDiv = document.createElement("div");
        this.cardDiv.className = "card";
        this.svgIcon = null;
        this.arrow =null;
        this.svgPath="SVG/thermometer.svg";
    }

    getDiv() {

		let tempAndTimeContainer = document.createElement("div");

		tempAndTimeContainer.className = "flexcontainer value";

        // create div to store the value
        let valDiv = document.createElement("div");
        valDiv.className = "value";
        valDiv.textContent = this.value;

        tempAndTimeContainer.appendChild(valDiv);

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
        TimeDiv.className = "time";
        TimeDiv.textContent = "19/09/18 13:38";
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