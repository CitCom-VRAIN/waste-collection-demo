import { HttpClient } from './HttpClient.js';
import { finishLoading, fillDistrictsSelector } from './UserInterface.js';
import { WasteContainer } from './WasteContainer.js';
import { Vehicle } from './Vehicle.js';
import { District } from './District.js'

export class DataManager {

    wasteContainers = [];
    vehicles = [];
    districts = [];
    filteredWasteContainers = [];

    constructor() {
        this.httpClient = new HttpClient();
    }

    async fetchData() {
        // Fetch data
        let wasteContainersData = await this.httpClient.get('wastecontainers');
        const vehiclesData = await this.httpClient.get('trucks');
        const districtsData = await this.httpClient.get('districts');

        // Check network error
        const error = wasteContainersData.error || vehiclesData.error || districtsData.error;

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
        this.filteredWasteContainers = this.wasteContainers;

        // Create Vehicle objects
        vehiclesData.forEach(vehicle => {
            this.vehicles.push(new Vehicle(vehicle.id, vehicle.location, vehicle.brandName, vehicle.fuelType, vehicle.cargoVolume))
        });

        // Create District objects
        districtsData.forEach(district => {
            this.districts.push(new District(district.nombre, district.nombre, district.geo_shape.geometry.coordinates[0], district.geo_point_2d))
        });

        // Fill select with districts
        fillDistrictsSelector(this.districts)
    }

    filter(fillingLevel, districtID) {
        const district = this.districts.find(district => district.id === districtID)

        // Copy original
        this.filteredWasteContainers = this.wasteContainers;

        // Filter by filling level filter
        this.filteredWasteContainers = this.wasteContainers.filter(container => container.fillingLevel.value >= fillingLevel / 100);

        // Geo filter
        let newFilter = [];
        if (district) {
            // Filter by district
            let districtPolygon = turf.polygon([district.coordinates])

            for (let i = 0; i < this.filteredWasteContainers.length; i++) {

                let wasteContainerLocation = this.filteredWasteContainers[i].location.value.coordinates;

                let point = turf.point(wasteContainerLocation);
                let contains = turf.booleanPointInPolygon(point, districtPolygon);

                if (contains) {
                    newFilter.push(this.filteredWasteContainers[i])
                }
            }
            this.filteredWasteContainers = newFilter;
            return newFilter;
        }
        return this.filteredWasteContainers;
    }
}