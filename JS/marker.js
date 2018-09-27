function getDataMarkerIcon(value, measurement) {
    let svgDiv = document.createElement("div");
    svgDiv.className = "svgDiv";
    let readingDiv = document.createElement("div");
    readingDiv.className = "readingDiv";

    let svgObject = document.createElement("object");
    svgObject.type = "image/svg+xml";
    svgObject.data = measurement.svgPath;
    svgObject.className = "markerSVG";

    let readingText = document.createElement("h1");
    readingText.innerHTML = value + measurement.units;
    readingText.className = "markerText";

    let tail = document.createElement("div");
    tail.className = "anchorTail";
    let dot = document.createElement("div");
    dot.className = "anchorDot";
    tail.appendChild(dot);

    svgDiv.appendChild(svgObject);
    readingDiv.appendChild(readingText);
    let container = document.createElement("div");
    container.appendChild(svgDiv);
    container.appendChild(readingDiv);
    container.appendChild(tail);

    return L.divIcon({className: "divIcon has-anchor", html: container.innerHTML, iconSize: [50, 50], iconAnchor: [25, 75]});
}

async function addSensor(markerID, markerController, indoorMapId, indoorMapFloorIndex, latLng, measurement, sensorData) {
    let settingsData = [];
    settingsData = await getSettings();
    let tempFormat = settingsData[0];

    let marker = markerController.addMarker(markerID, latLng, {indoorMapId: indoorMapId, indoorMapFloorId: indoorMapFloorIndex});
    marker.setIcon(getDataMarkerIcon(Math.round(sensorData[sensorData.length - 1].reading), measurement));

    let card = new Card(measurement, sensorData);
    let div = card.getDiv();

    let popupOptions = {
        indoorMapId: indoorMapId,
        indoorMapFloorIndex: indoorMapFloorIndex,
        autoClose: false,
    };
    let popup = L.popup(popupOptions)
        .setLatLng(latLng)
        .setContent(div);

    popup.card = card;
    popup.measurement = measurement;
    popup.sensorData = sensorData;

    marker.bindPopup(popup).on("popupopen", function() { updateCard(sensorData, measurement) });
}

function updateSensor(markerController, sensorData, settingsData) {
    let markerIds = markerController.getAllMarkerIds();
    let tempFormat = settingsData[0];

    for(i=0; i<markerIds.length; i++) {
        // change marker icon
        let marker = markerController.getMarker(markerIds[i]);
        let popup = marker.getPopup();

        popup.sensorData = sensorData;

        marker.setIcon(getDataMarkerIcon(Math.round(sensorData[sensorData.length - 1].reading), popup.measurement));

        // update content of the popup
        if(popup.isOpen()) {
            updateCard(sensorData, popup.measurement);
        }
    }
}

function updateCard(sensorReading, measurement) {
    let slider = document.getElementById("cardSlider");
    let position = 12;
    if(slider != null) {
        position = slider.value;
    }
    let readingValue = Math.round(sensorReading[sensorReading.length - 1 - (12-position)].reading * 100) / 100;
    document.getElementById("valueText").textContent = readingValue;
    document.getElementById("timeDateText").textContent = sensorReading[sensorReading.length - 1 - (12-position)].date + " " + sensorReading[sensorReading.length - 1 - (12-position)].time;
    fillSvg(document.getElementById("svgIcon"), readingValue, measurement);
}

function fillSvg(svgIcon, currValue, measurement) {
    let fillPercent = calculatePercentageFill(measurement.rangeMin, measurement.rangeMax, currValue);

    if(fillPercent < 0) {
        fillPercent = 0;
    } else if(fillPercent > 1) {
        fillPercent = 1;
    }

    let contentDoc = svgIcon.contentDocument;

    let percentages = contentDoc.getElementsByClassName("level");;
    let decimals = contentDoc.getElementsByClassName("levelAnim");

    // set new percentages
    for(let i=0; i<percentages.length; i++) {
        percentages[i].setAttribute("offset", fillPercent * 100 + "%");
    }

    // set new animation points
    for(let i=0; i<decimals.length; i++) {
        decimals[i].setAttribute("to", fillPercent);
    }
}

function calculatePercentageFill(rangeMin, rangeMax, currValue) {
    return (currValue - rangeMin) / (rangeMax - rangeMin);
}
