import { HttpClient } from './HttpClient.js';

export class Optimizer {

    constructor() {
        this.httpClient = new HttpClient();
    }

    async optimize(wasteContainers, vehicles, endLocation) {
        let wasteContainersCoords = wasteContainers.map(container => container.marker.location)
        const data = {
            coords: JSON.stringify(wasteContainersCoords),
            vehicles: JSON.stringify(vehicles),
            end: JSON.stringify(endLocation)
        };

        const solution = await this.httpClient.get('optimization', data);
        return solution;
    }
}