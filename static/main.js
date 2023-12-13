import * as leaflet from "https://unpkg.com/leaflet/dist/leaflet-src.esm.js";
import { LeafletMap } from './modules/LeafletMap.js';
import { DataManager } from './modules/DataManager.js';
import { fillingLevelValue, districtValue } from './modules/UserInterface.js'
import { Optimizer } from './modules/Optimizer.js';
import * as MapboxPolyline from "https://cdn.skypack.dev/@mapbox/polyline@1.1.1";

(async function main() {
    // Init data manager
    const dataManager = new DataManager();

    // Fetch necessary data
    await dataManager.fetchData();

    // Init Leaflet map
    const map = new LeafletMap('map', [dataManager.wasteContainers[0].location.lat, dataManager.wasteContainers[0].location.lng]);

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
            updateMarkers(map, dataManager)
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

    // Optimization
    const optimizer = new Optimizer();

    // On plan route button click
    document.querySelector('#optimize-button').addEventListener('click', async () => {
        const solution = await optimizer.optimize(dataManager.filteredWasteContainers, dataManager.vehicles)
        console.log(solution, solution.routes)

        // Print solution on map
        const lineColors = ["green", "blue", "yellow"]

        map.layers.routes.clearLayers()
        solution.routes.forEach((route, index) => {
            const polyline = L.polyline(MapboxPolyline.decode(route.geometry), { color: lineColors[index] }).addTo(map.layers.routes)
        });



    })
}());

function updateMarkers(map, dataManager) {
    console.log(map.layers.containers)

    // Filter
    const filteredWasteContainers = dataManager.filter(fillingLevelValue(), districtValue())

    // Clear
    map.layers.containers.clearLayers()

    // Add (x2 dirty fix, strange problem with leaflet)
    filteredWasteContainers.forEach(container => {
        container.marker.addTo(map.layers.containers);
        container.marker.addTo(map.layers.containers);
    });
}