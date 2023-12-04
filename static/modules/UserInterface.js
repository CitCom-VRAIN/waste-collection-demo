function initLoading() {
    document.getElementById('loading-animation').classList.remove("is-hidden")
    document.getElementById("loading").classList.remove("is-hidden")
    document.getElementById("dashboard").classList.add("is-hidden")
}

function finishLoading(error) {
    document.getElementById('loading-animation').classList.add("is-hidden")
    if (error) {
        document.getElementById("loading").classList.remove("is-hidden")
        document.getElementById("dashboard").classList.add("is-hidden")
        document.getElementById('status-message').innerHTML = `Error fetching data: ${error}. <br> Please, reload the page to try again.`;
    } else {
        document.getElementById("loading").classList.add("is-hidden")
        document.getElementById("dashboard").classList.remove("is-hidden")
    }
}

function fillDistrictsSelector(id, districts) {
    districts.forEach(district => {
        document.getElementById(id).innerHTML += `<option value="${district.nombre}">${district.nombre.toLowerCase()}</option>`
    });
    document.getElementById('districts-select-div').classList.remove('is-loading')
}

function openVehicleSettings(vehicle) {
    document.getElementById('vehicle-settings').classList.add("is-active");
    document.getElementById('vehicle-fuel').value = vehicle.fuelType;
    document.getElementById('vehicle-brand').value = vehicle.brandName;
    document.getElementById('vehicle-cargo').value = vehicle.cargoVolume;
}

function closeVehicleSettings() {
    document.getElementById('vehicle-settings').classList.remove("is-active");
}

export { initLoading, finishLoading, fillDistrictsSelector }