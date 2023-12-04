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
        if (this.location && this.location.value) {
            const marker = L.marker(this.location.value.coordinates.reverse(),
                {
                    icon: icon,
                    draggable: this.draggable
                });

            if (this.onclickEvent) {
                marker.on('click', onclickEvent.bind(null, this.onclickEvent))
            }

            if (this.tooltip) {
                marker.bindTooltip(this.tooltip);
            }

            marker.addTo(layer);
        }

    }
}