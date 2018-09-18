function getDataMarkerIcon(sensorReading, svgPath) {
    let svgDiv = document.createElement("div");
    svgDiv.className = "svgDiv";
    let readingDiv = document.createElement("div");
    readingDiv.className = "readingDiv";

    let svgObject = document.createElement("object");
    svgObject.type = "image/svg+xml";
    svgObject.data = svgPath;
    svgObject.className = "markerSVG";

    let readingText = document.createElement("h1");
    readingText.innerHTML = sensorReading;
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
