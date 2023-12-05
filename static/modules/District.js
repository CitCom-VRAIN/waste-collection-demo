export class District {

    constructor(id, name, coordinates, centroid) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.centroid = centroid;
        this.polygon = this.buildPolygon()
    }

    buildPolygon(color = 'red') {
        // Find district polygon
        const districtCoordinates = this.coordinates;

        // Reverse coords to fit leaflet coords system
        this.coordinates.forEach(coords => {
            coords = coords.reverse()
        });

        // Add leaflet polygon to data
        let polygon = L.polygon(districtCoordinates, { color: color })
        return polygon;
    }
}