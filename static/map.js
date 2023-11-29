let map;

function createMap() {
    // Create leaflet map
    const map = L.map('map').setView([39.46990582380913, -0.3762880370023189], 14);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 19,
        attributionControl: false,
        id: 'mapbox/streets-v12',
        accessToken: "pk.eyJ1Ijoiam9hbW90ZW8iLCJhIjoiY2xocmx1ZGY3MDFybjNubGJlaTdjcjBsZCJ9.mJrUbql3gIW1fAwgtI8_dg"
    }).addTo(map);

    map.attributionControl.setPrefix('');

    return map
}

function addMarkers(map, icon, color, data, draggable, tooltip = undefined, onclickEvent = undefined) {
    // Custom marker
    let customMarker = L.AwesomeMarkers.icon({
        icon: icon,
        markerColor: color,
        prefix: 'fa'
    });
    // Add to map
    data.forEach(element => {

        if (element.location && element.location.value) {
            let marker = L.marker(element.location.value.coordinates.reverse(),
                {
                    icon: customMarker,
                    draggable: draggable
                });

            if (onclickEvent) {
                marker.on('click', onclickEvent.bind(null, element))
            }

            if (tooltip && element.fillingLevel) {
                console.log()
                marker.bindTooltip(`<b>Level:</b> ${Math.round(element.fillingLevel.value * 100)}%`);
            }

            marker.addTo(map);
        }

    });
}