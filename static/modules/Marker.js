export class Marker {
    constructor(location, icon, color, draggable, tooltip = null, onclickEvent = null) {
        this.location = location;
        this.icon = icon;
        this.color = color;
        this.draggable = draggable;
        this.tooltip = tooltip;
        this.onclickEvent = onclickEvent;
    }
    addTo(layer) {
        // Custom marker
        const icon = L.AwesomeMarkers.icon({
            icon: this.icon,
            markerColor: this.color,
            prefix: 'fa'
        });
        // Add to map
        if (this.location) {
            // Create Leaflet marker. Leaflet expects [lat, lng] format
            const marker = L.marker([this.location.lat, this.location.lng],
                {
                    icon: icon,
                    draggable: this.draggable
                });

            // Bind click event
            if (this.onclickEvent) {
                marker.on('click', this.onclickEvent);
            }

            // On move, update location
            marker.on('move', (event) => {
                this.location.lat = event.latlng.lat;
                this.location.lng = event.latlng.lng;
            });

            // Bind tooltip
            if (this.tooltip) {
                marker.bindTooltip(this.tooltip);
            }

            marker.addTo(layer);
        }

    }
}