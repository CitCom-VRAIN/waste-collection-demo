import * as leaflet from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { LeafletMap } from './modules/LeafletMap.js';
import { DataManager } from './modules/DataManager.js';
import { fillingLevel, district } from './modules/UserInterface.js'

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
            updateMarkers(map, dataManager);
        }, 500)
    });

    // On district change
    document.querySelector('#districts-select').addEventListener('change', (event) => {
        const district = dataManager.districts.find(district => district.id === event.target.value)

        if (district) {
            map.layers.districts.clearLayers();
            district.polygon.addTo(map.layers.districts)
            map.panTo(district.centroid)
        } else {
            map.layers.districts.clearLayers();
        }

        updateMarkers(map, dataManager)

    })
}());

function updateMarkers(map, dataManager) {
    // Filter
    const filteredWasteContainers = dataManager.filter(fillingLevel(), district())

    // Clear
    map.layers.containers.clearLayers()

    // Add
    filteredWasteContainers.forEach(container => {
        container.marker.addTo(map.layers.containers);
    });
}