import { Marker } from './Marker.js';

export class WasteContainer {
    constructor(id, fillingLevel, location) {
        this.id = id;
        this.fillingLevel = fillingLevel;
        this.marker = new Marker(location, 'dumpster', 'blue', false, `<b>Level:</b> ${Math.round(fillingLevel.value * 100)}%`, null)
    }
}