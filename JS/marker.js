function getDataMarkerIcon(value, units, svgPath) {
    let svgDiv = document.createElement("div");
    svgDiv.className = "svgDiv";
    let readingDiv = document.createElement("div");
    readingDiv.className = "readingDiv";

    let svgObject = document.createElement("object");
    svgObject.type = "image/svg+xml";
    svgObject.data = svgPath;
    svgObject.className = "markerSVG";

    let readingText = document.createElement("h1");
    readingText.innerHTML = value + units;
    readingText.className = "markerText";

    let tail = document.createElement("div");
    tail.className = "anchorTail";
    let dot = document.createElement("div");
    dot.className = "anchorDot"
    tail.appendChild(dot);

    svgDiv.appendChild(svgObject);
    readingDiv.appendChild(readingText);
    let container = document.createElement("div");
    container.appendChild(svgDiv);
    container.appendChild(readingDiv);
    container.appendChild(tail);

    return L.divIcon({className: "divIcon has-anchor", html: container.innerHTML, iconSize: [50, 50], iconAnchor: [25, 75]});
}

async function addSensor(markerController, indoorMapId, indoorMapFloorIndex, latLng, units, svgPath) {
    let sensorData = [];
    let settingsData = [];
    sensorData = await getData();
    settingsData = await getSettings();
    let tempFormat = settingsData[0]
    console.log(settingsData[0]);

    let marker = markerController.addMarker(0, latLng, {indoorMapId: indoorMapId, indoorMapFloorId: indoorMapFloorIndex});
    marker.setIcon(getDataMarkerIcon(Math.round(convert(tempFormat, sensorData[0].reading)), units, svgPath));

    let card = new Card(Math.round(convert(tempFormat, sensorData[0].reading) * 100) / 100, units, sensorData[0].date, sensorData[0].time, svgPath);
    let div = card.getDiv();

    let popupOptions = {
        indoorMapId: indoorMapId,
        indoorMapFloorIndex: indoorMapFloorIndex,
        autoClose: false,
    };
    let popup = L.popup(popupOptions)
        .setLatLng(latLng)
        .setContent(div);

    marker.bindPopup(popup);
}

async function updateSensor(markerController) {
    let sensorData = [];
    sensorData = await getData();
    settingsData = await getSettings();
    let markerIds = markerController.getAllMarkerIds();
    let tempFormat = settingsData[0];
    for(i=0; i<markerIds.length; i++) {
        // change marker icon
        let marker = markerController.getMarker(markerIds[i]);
        marker.setIcon(getDataMarkerIcon(Math.round(convert(tempFormat, sensorData[7].reading)), "°"+tempFormat, "SVG/thermometer.svg"));

        // update content of the popup
        let popup = marker.getPopup();

        let value = popup.getContent().getElementsByClassName("valueText");
        value[0].textContent = Math.round(convert(tempFormat, sensorData[7].reading) * 100) / 100 + "°"+tempFormat;
        let time = popup.getContent().getElementsByClassName("timeDateText");
        time[0].textContent = sensorData[7].date + " " + sensorData[7].time;

        if(popup.isOpen()) {
            popup.update();
        }
    }
}
