import { HttpClient } from './HttpClient.js';
import { WasteContainer } from './WasteContainer.js';
import { Vehicle } from './Vehicle.js';

export class DataManager {

    wasteContainers = [];
    vehicles = [];
    filteredWasteContainers = [];

    constructor() {
        this.httpClient = new HttpClient();
    }

    async fetchData() {
        // Fetch data
        let wasteContainersData = await this.httpClient.get('wastecontainers');
        const vehiclesData = await this.httpClient.get('trucks');

        // Check network error
        const error = wasteContainersData.error || vehiclesData.error;

        if (error) {
            return { error: error };
        }

        // Clean wasteContainers data
        wasteContainersData = wasteContainersData.filter(container => 'fillingLevel' in container && 'location' in container)

        // Create WasteContainer objects
        wasteContainersData.forEach(container => {
            this.wasteContainers.push(new WasteContainer(container.id, container.fillingLevel, { lng: container.location.value.coordinates[0], lat: container.location.value.coordinates[1] }))
        });
        this.filteredWasteContainers = this.wasteContainers;

        // Create Vehicle objects
        vehiclesData.forEach(vehicle => {
            this.vehicles.push(new Vehicle(vehicle.id, { lng: vehicle.location.value.coordinates[0], lat: vehicle.location.value.coordinates[1] }, vehicle.brandName, vehicle.fuelType, vehicle.cargoVolume))
        });
    }

    filter(fillingLevel) {
        // Copy original
        this.filteredWasteContainers = this.wasteContainers;

        // Filter by filling level filter
        this.filteredWasteContainers = this.wasteContainers.filter(container => container.fillingLevel.value >= fillingLevel / 100);

        // Geo filter
        let geoFilter = [];

        return this.filteredWasteContainers;
    }
}