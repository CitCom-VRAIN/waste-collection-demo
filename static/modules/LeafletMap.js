export class LeafletMap {

    layers = {
        containers: null,
        vehicles: null,
        routes: null
    }

    constructor(id, initialLocation) {
        this.map = L.map(id).setView(initialLocation, 14);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 19,
            attributionControl: false,
            id: 'mapbox/streets-v12',
            accessToken: "pk.eyJ1Ijoiam9hbW90ZW8iLCJhIjoiY2xocmx1ZGY3MDFybjNubGJlaTdjcjBsZCJ9.mJrUbql3gIW1fAwgtI8_dg"
        }).addTo(this.map);

        this.map.attributionControl.setPrefix('');

        // Create layerGroups
        this.layers.containers = L.layerGroup().addTo(this.map);
        this.layers.vehicles = L.layerGroup().addTo(this.map);
        this.layers.routes = L.layerGroup().addTo(this.map);
    }

    panTo(coords) {
        this.map.panTo(coords)
    }
}