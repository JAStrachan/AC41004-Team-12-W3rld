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
    sensorData = await getData();

    let marker = markerController.addMarker(2, latLng, {indoorMapId: indoorMapId, indoorMapFloorId: indoorMapFloorIndex});
    marker.setIcon(getDataMarkerIcon(Math.round(convert("C", sensorData[0].reading)), units, svgPath));

    let card = new Card(Math.round(convert("C", sensorData[0].reading) * 100) / 100, units, sensorData[0].date, sensorData[0].time, svgPath);
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
