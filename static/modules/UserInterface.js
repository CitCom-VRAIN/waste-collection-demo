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

        document.getElementById("error").classList.remove("is-hidden")
        document.getElementById('status-message').innerHTML = `Network error. Please, reload the page to try again.`;
    } else {
        document.getElementById("loading").classList.add("is-hidden")
        document.getElementById("dashboard").classList.remove("is-hidden")
    }
}

function fillDistrictsSelector(districts) {
    districts.forEach(district => {
        document.getElementById('districts-select').innerHTML += `<option value="${district.name}">${district.name.toLowerCase()}</option>`
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

function fillingLevelValue() {
    return parseInt(document.querySelector("#filling-level").value) || 0;
}

function districtValue() {
    return document.querySelector("#districts-select").value || 'all';
}

export { initLoading, finishLoading, fillDistrictsSelector, openVehicleSettings, fillingLevelValue, districtValue }