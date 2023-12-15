import * as leaflet from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { LeafletMap } from './modules/LeafletMap.js';
import { DataManager } from './modules/DataManager.js';
import { districtsSelect, fillingLevelInput, optimizeButton } from './modules/UserInterface.js'
import { Optimizer } from './modules/Optimizer.js';
import * as MapboxPolyline from "https://cdn.skypack.dev/@mapbox/polyline@1.1.1";
import { Marker } from './modules/Marker.js';

(async function main() {
    // Init data manager
    const dataManager = new DataManager();

    // Fetch necessary data
    await dataManager.fetchData();

    // Init Leaflet map
    const map = new LeafletMap('map', [dataManager.wasteContainers[0].marker.location.lat, dataManager.wasteContainers[0].marker.location.lng]);

    // Add WasteContainer markers
    dataManager.wasteContainers.forEach(container => {
        container.marker.addTo(map.layers.containers);
    });

    // Add vehicle markers
    dataManager.vehicles.forEach(vehicle => {
        vehicle.marker.addTo(map.layers.vehicles);
    });

    // Add end marker
    const endLocation = { lng: -0.4659541881677676, lat: 39.43387281671579 }
    const endMarker = new Marker(endLocation, 'flag-checkered', 'red', true, '<b>End location</b>');
    endMarker.addTo(map.layers.vehicles);

    // On filling level change
    fillingLevelInput.addEventListener('keyup', () => {
        // Delay to let user end
        setTimeout(() => {
            map.layers.routes.clearLayers();
            updateMarkers(map, dataManager)
        }, 500)
    });

    // On district change
    districtsSelect.addEventListener('change', (event) => {
        map.layers.routes.clearLayers();
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

    // Optimization
    const optimizer = new Optimizer();

    // On plan route button click
    optimizeButton.addEventListener('click', async () => {
        if (dataManager.filteredWasteContainers.length > 0) {
            const solution = await optimizer.optimize(dataManager.filteredWasteContainers, dataManager.vehicles, endMarker.location)

            // Print solution on map
            const lineColors = ["green", "blue", "yellow"]

            map.layers.routes.clearLayers();
            solution.routes.forEach((route, index) => {
                const polyline = L.polyline(MapboxPolyline.decode(route.geometry), { color: lineColors[index] }).addTo(map.layers.routes)
            });
        }
    })
}());

function updateMarkers(map, dataManager) {
    // Filter
    const filteredWasteContainers = dataManager.filter(fillingLevelInput.value || 0, districtsSelect.value || 'all')

    // Clear
    map.layers.containers.clearLayers()

    // Add (x2 dirty fix, strange problem with leaflet)
    filteredWasteContainers.forEach(container => {
        container.marker.addTo(map.layers.containers);
        container.marker.addTo(map.layers.containers);
    });
}