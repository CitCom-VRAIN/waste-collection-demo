import { HttpClient } from './HttpClient.js';

export class Optimizer {

    constructor() {
        this.httpClient = new HttpClient();
    }

    async optimize(WasteContainers) {
        let wasteContainersCoords = WasteContainers.map(container => container.location)
        const data = { coords: JSON.stringify(wasteContainersCoords) }
        const solution = await this.httpClient.get('optimization', data);
        return solution;
    }
}