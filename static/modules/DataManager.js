import { HttpClient } from './HttpClient.js';
import { finishLoading, fillDistrictsSelector } from './UserInterface.js';
import { WasteContainer } from './WasteContainer.js';
import { Vehicle } from './Vehicle.js';

export class DataManager {

    wasteContainers = []
    vehicles = []

    constructor() {
        this.httpClient = new HttpClient();
    }

    async fetchData() {
        let wasteContainersData = await this.httpClient.get('wastecontainers');
        const vehicles = await this.httpClient.get('trucks');
        this.districts = await this.httpClient.get('districts');

        const error = wasteContainersData.error || this.vehicles.error || this.districts.error;

        if (error) {
            finishLoading(error)
            return;
        }
        finishLoading()

        // Clean wasteContainers data
        wasteContainersData = wasteContainersData.filter(container => 'fillingLevel' in container && 'location' in container)

        // Create WasteContainer objects
        wasteContainersData.forEach(container => {
            this.wasteContainers.push(new WasteContainer(container.id, container.fillingLevel, container.location))
        });

        // Create Vehicle objects
        vehicles.forEach(vehicle => {
            this.vehicles.push(new Vehicle(vehicle.id, vehicle.location, vehicle.brandName, vehicle.fuelType, vehicle.cargoVolume))
        });

        // Fill select with districts
        fillDistrictsSelector("districts-select", this.districts)
    }
}