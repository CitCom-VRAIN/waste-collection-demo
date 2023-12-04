import { Marker } from './Marker.js';
import { openVehicleSettings } from './UserInterface.js';

export class Vehicle {
    constructor(id, location, brandName, fuelType, cargoVolume) {
        this.id = id;
        this.location = location;
        this.brandName = brandName;
        this.fuelType = fuelType;
        this.cargoVolume = cargoVolume;
        this.marker = new Marker(location, 'truck', 'green')
    }
}