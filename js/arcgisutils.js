function drawPoint(graphicsLayer,lon,lat,popupTemplate,attributes){
    const point = { //Create a point
        type: "point",
        longitude: lon,
        latitude: lat
    };
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    };
    const pointGraphic = {
        type:"graphic",
        geometry: point,
        symbol: simpleMarkerSymbol,
        popupTemplate,attributes
    };
    graphicsLayer.add(pointGraphic);
}
function drawPolyline (graphicsLayer,paths,popupTemplate,attributes){
    const polyline = {
        // hasZ:true,
        // hasM:true,
        type: "polyline",
        paths: paths
    };
    const simpleLineSymbol = {
        type: "simple-line",
        color: [105, 230, 255], 
        width: 2
    };

    const polylineGraphic = {
        type: 'graphic',
        geometry: polyline,
        symbol: simpleLineSymbol,
        popupTemplate,attributes
    };
    graphicsLayer.add(polylineGraphic);
}
function drawPolygon (graphicsLayer,polyRings,popupTemplate,attributes ){
    //polygon fill
    const simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // Orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };
    const polygon = {
        type: "polygon",
        rings: polyRings
    };
    const polygonGraphic = {
        type: 'graphic',
        geometry: polygon,
        symbol: simpleFillSymbol,
        popupTemplate,attributes
    };
    graphicsLayer.add(polygonGraphic);
}










// require(["esri/config", "esri/layers/FeatureLayer"], function (esriConfig, FeatureLayer) {
//     esriConfig.apiKey = "AAPK17a868beeabf4ce68552f11cfc9bdd9eqVs-MrYe15ctk4npZTL_1jAZ3HarREMvOIBvDYDMXJZAgYcEqkBlCYtEiyGoCC_q";

//     const queryFeatureLayer = () => {
//         clearMessage();
//         console.debug("queryFeatureLayer()");
//         const itemText = document.getElementById('txt-itemid');
//         const itemId = itemText.value.length > 0 ? itemText.value : PORTALITEM_INDEXFL;
//         const indexFL = new FeatureLayer({
//             portalItem: {
//                 id: itemId
//             }
//         });
//         indexFL.load().then(async () => {
//             const qtext = document.getElementById('txt-query');
//             const query = indexFL.createQuery();
//             if (qtext.value.length > 0) {
//                 query.where = qtext.value;
//             }
//             const qResult = await indexFL.queryFeatures(query);
//             console.debug(qResult);
//             console.debug(qResult.features);
//             const textArea = document.getElementById('txt-output');
//             //textArea.value = "";
//             qResult.features.forEach((feature) => {
//                 textArea.append(JSON.stringify(feature.attributes) + '\n');
//             });
//         });
//     }
// });