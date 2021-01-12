mapboxgl.accessToken = 'pk.eyJ1IjoicmVkaWV0MSIsImEiOiJja2ppd2tzdW02eWI5MnlxamRra3N5NHFsIn0.0yrFCxq-75dR7SBo5sZgIA';
document.getElementById("instructions").style.display = "none";
document.getElementById("addbtn").style.display = "none";
var zo = 18;
var pi = 55;
var be = -20;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-77.03655123710632,
        38.89767132073927
    ],
    zoom: zo,
    pitch: pi,
    bearing: be,
    antialias: true
});

AOS.init({
    once: true,
    easing: 'ease-in-out'
});

function fadeout() {
    document.getElementById("getstarted").style.display = "none";
    document.getElementById("map").style.opacity = 1;
    // document.getElementById("instructions").style.display = "block";
    document.getElementById("addbtn").style.display = "block";
}

map.on('load', () => {
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#fff',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate', ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05, ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate', ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05, ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.89
            }
        },
        labelLayerId
    );
    map.addSource("pointSoource", {
        type: "geojson",
        data: ({
            "type": "FeatureCollection",
            "features": [{
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.03655123710632,
                            38.89767132073927
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            3.8671874999999996,
                            24.5271348225978
                        ]
                    }
                }
            ]
        })
    });
    map.addLayer({
        id: "point",
        source: "pointSoource",
        type: "circle"
    });
    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });
    popup.setLngLat([-77.03655123710632, 38.89767132073927])
        .setHTML("")
        // .setImage('https://i.imgur.com/0LKZQYM.jpg')
        .addTo(map)

});

// map.on("load", e => {
//     const result = map.queryRenderedFeatures(e.point, { layers: ["point"] })
//     if (result.length) {
//         const popup = new mapboxgl.Popup();
//         popup.setLngLat([-77.03655123710632, 38.89767132073927])
//             .setHTML("<h1>MapBox</h1><hr> test")
//             .addTo(map)
//     }
// });