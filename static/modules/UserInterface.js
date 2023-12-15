/* -------------------
---- UI elements ----
---------------------*/

// Loading screen
const loading = document.querySelector("#loading");
const loadingAnimation = document.querySelector("#loading-animation");
const dashboard = document.querySelector("#dashboard");
const error = document.querySelector("#error");
const statusMessage = document.querySelector("#status-message");

// Form
const districtsSelect = document.querySelector("#districts-select");
const districtsSelectDiv = document.querySelector("#districts-select-div");
const fillingLevelInput = document.querySelector("#filling-level");
const resetFormButton = document.querySelector("#reset-form");
const optimizeButton = document.querySelector('#optimize-button');

// Vehicle settings modal
const vehicleSettings = document.getElementById('vehicle-settings');
const vehicleSettingsCloseButton = document.querySelector("#vehicle-settings-close");
const vehicleSettingsCancelButton = document.querySelector("#vehicle-settings-cancel");
const vehicleSettingsSaveButton = document.querySelector('#vehicle-settings-save');
const vehicleFuel = document.getElementById('vehicle-fuel');
const vehicleBrand = document.getElementById('vehicle-brand');
const vehicleCargo = document.getElementById('vehicle-cargo');

/* -------------------
------- Events -------
---------------------*/

vehicleSettingsCloseButton.addEventListener("click", closeVehicleSettings);
vehicleSettingsCancelButton.addEventListener("click", closeVehicleSettings);
vehicleSettingsSaveButton.addEventListener("click", closeVehicleSettings);
resetFormButton.addEventListener("click", resetForm);

/* -------------------
---- UI functions ----
---------------------*/
function initLoading() {
    loadingAnimation.classList.remove("is-hidden")
    loading.classList.remove("is-hidden")
    dashboard.classList.add("is-hidden")
}

function finishLoading(error) {
    loadingAnimation.classList.add("is-hidden")
    if (error) {
        loading.classList.remove("is-hidden")
        dashboard.classList.add("is-hidden")

        error.classList.remove("is-hidden")
        statusMessage.innerHTML = `Network error. Please, reload the page to try again.`;
    } else {
        loading.classList.add("is-hidden")
        dashboard.classList.remove("is-hidden")
    }
}

function fillDistrictsSelector(districts) {
    districts.forEach(district => {
        districtsSelect.innerHTML += `<option value="${district.name}">${district.name.toLowerCase()}</option>`
    });
    districtsSelectDiv.classList.remove('is-loading')
}

function openVehicleSettings(vehicle) {
    vehicleSettings.classList.add("is-active");
    vehicleFuel.value = vehicle.fuelType;
    vehicleBrand.value = vehicle.brandName;
    vehicleCargo.value = vehicle.cargoVolume;
}

function closeVehicleSettings() {
    vehicleSettings.classList.remove("is-active");
}

function resetForm() {
    // Change event
    const changeEvent = new Event('change');
    const keyupEvent = new Event('keyup');

    districtsSelect.value = "all";
    districtsSelect.dispatchEvent(changeEvent);

    fillingLevelInput.value = "";
    fillingLevelInput.dispatchEvent(keyupEvent);
}

export { initLoading, finishLoading, fillDistrictsSelector, openVehicleSettings, districtsSelect, fillingLevelInput, optimizeButton }