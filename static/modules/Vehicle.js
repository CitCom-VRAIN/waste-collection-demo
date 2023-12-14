import { Marker } from './Marker.js';
import { openVehicleSettings } from './UserInterface.js';

export class Vehicle {
    constructor(id, location, brandName, fuelType, cargoVolume) {
        this.id = id;
        this.location = {
            lng: location.value.coordinates[0],
            lat: location.value.coordinates[1]
        };
        this.brandName = brandName;
        this.fuelType = fuelType;
        this.cargoVolume = cargoVolume;
        this.marker = new Marker(location, 'truck', 'green', true, null, () => {
            openVehicleSettings(this)
        },
            (event) => {
                this.location.lat = event.latlng.lat;
                this.location.lng = event.latlng.lng;
            })
    }
}