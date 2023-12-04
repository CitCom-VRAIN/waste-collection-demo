import * as leaflet from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { LeafletMap } from './modules/LeafletMap.js';
import { DataManager } from './modules/DataManager.js';

(async function main() {
    // Init data manager
    const dataManager = new DataManager();

    // Fetch necessary data
    await dataManager.fetchData();

    // Init Leaflet map
    const map = new LeafletMap('map');

    // Add WasteContainer markers
    dataManager.wasteContainers.forEach(container => {
        container.marker.addTo(map.layers.containers);
    });

    // Add vehicle markers
    dataManager.vehicles.forEach(vehicle => {
        vehicle.marker.addTo(map.layers.vehicles);
    });

    // On filling level change
    document.querySelector('#filling-level').addEventListener('keyup', () => {
        // Delay to let user end
        setTimeout(() => {
            console.log("hey")
        }, 500)
    })
}());