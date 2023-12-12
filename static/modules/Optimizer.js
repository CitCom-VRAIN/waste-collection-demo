import { HttpClient } from './HttpClient.js';

export class Optimizer {

    constructor() {
        this.httpClient = new HttpClient();
    }

    async optimize(wasteContainers, vehicles) {
        let wasteContainersCoords = wasteContainers.map(container => container.location)
        const data = { 
            coords: JSON.stringify(wasteContainersCoords), 
            vehicles: JSON.stringify(vehicles) 
        };
        
        const solution = await this.httpClient.get('optimization', data);
        return solution;
    }
}