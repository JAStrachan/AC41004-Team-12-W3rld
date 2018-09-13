class Card {
    constructor(value) {
        this.value = value;
        this.expanded = false;
    }

    getDiv() {
        // create empty card
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";

        // create div to store the value
        let valDiv = document.createElement("div");
        valDiv.className = "value";
        valDiv.textContent = this.value;

        // create div to store SVG icon
        let iconDiv = document.createElement("div");
        iconDiv.className = "icon";

        // create div to store graph
        let graphDiv = document.createElement("div");
        graphDiv.className = "graph";

        // create div to store expand/contract button
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "button";
        let arrow = document.createElement("i");
        arrow.className = "arrow";
        buttonDiv.appendChild(arrow);
        buttonDiv.addEventListener("click", function() {
            if(!this.expanded) {
                this.expanded = true;

                // flip arrow
                arrow.style.transform = "rotate(225deg)";

                // expand card
                cardDiv.style.height = "calc(2 * var(--card-height))";
            }
            else {
                this.expanded = false;

                // flip arrow
                arrow.style.transform = "rotate(45deg)";

                // shrink card
                cardDiv.style.height = "calc(var(--card-height))";
            }
        });

        // combine elements into card
        cardDiv.appendChild(valDiv);
        cardDiv.appendChild(iconDiv);
        cardDiv.appendChild(buttonDiv);
        cardDiv.appendChild(graphDiv);
        return cardDiv;
    }
}
