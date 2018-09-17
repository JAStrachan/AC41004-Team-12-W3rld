class Card {
    constructor(value) {
        this.value = value;
        this.expanded = false;
    }

    getDiv() {
        // create empty card
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";

		let container = document.createElement("div");

		container.className = "flexcontainer value";

        // create div to store the value
        let valDiv = document.createElement("div");
        valDiv.className = "value";
        valDiv.textContent = this.value;

        let TimeDiv = this.getTimeDiv();
        let sliderDiv = this.getSliderDiv();
        let iconDiv = this.getIconDiv();
        let buttonDiv = this.getButtonDiv();
        let graphDiv = this.getGraphDiv();
        
        // combine elements into card
		container.appendChild(valDiv);
		container.appendChild(TimeDiv);
        container.appendChild(sliderDiv);
		cardDiv.appendChild(container);
        cardDiv.appendChild(iconDiv);
        cardDiv.appendChild(buttonDiv);
        cardDiv.appendChild(graphDiv);
        return cardDiv;
    }

    // create div to store the time
    getTimeDiv()
    {
        let TimeDiv = document.createElement("div");
        TimeDiv.className = "time";
        TimeDiv.textContent = "13:38";
        return TimeDiv;
    }

    getIconDiv()
    {
        // create div to store SVG icon
        let iconDiv = document.createElement("div");
        iconDiv.className = "flexcontainer icon";

        // add svg into iconDiv
        let svgIcon = document.createElement("object");
        svgIcon.type = "image/svg+xml";
        svgIcon.data = "SVG/thermometer.svg";
        svgIcon.style.height = "calc(var(--card-height) - var(--button-height))";
        svgIcon.style.width = "100%";

        iconDiv.appendChild(svgIcon);
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
        slider.style.min = "1";
        slider.style.max = "12";
        slider.style.value = "12";

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

        let arrow = document.createElement("i");
        arrow.className = "arrow";
        buttonDiv.appendChild(arrow);

        buttonDiv.addEventListener("click", expandCard());
    }

    expandCard()
    {
        if(!this.expanded) {
            this.expanded = true;

            // flip arrow
            arrow.style.transform = "rotate(225deg)";
            arrow.style.marginTop = "5px";
            arrow.style.marginBottom = "auto";

            // expand card
            cardDiv.style.height = "calc(var(--card-height-expanded) + var(--graph-height))";
            cardDiv.style.width = "var(--card-width-expanded)";

            // get svgobject
            var doc = svgIcon.contentDocument;
            var percentages = doc.getElementsByClassName("level");
            var decimals = doc.getElementsByClassName("levelAnim");

            // set new percentages
            for(var i=0; i<percentages.length; i++) {
                percentages[i].setAttribute("offset", "60%");
            }

            // set new animation points
            for(var i=0; i<decimals.length; i++) {
                decimals[i].setAttribute("to", "0.6");
            }

            // loading graph for sensor
            var graph = new Graph();
            graph.createGraph();
        }
        else {
            this.expanded = false;

            // flip arrow
            arrow.style.transform = "rotate(45deg)";
            arrow.style.marginTop = "auto";
            arrow.style.marginBottom = "5px";

            // // shrink card
            cardDiv.style.height = "";
            cardDiv.style.width = "";
        } 
    }
}
