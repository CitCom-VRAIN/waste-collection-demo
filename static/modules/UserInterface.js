/* -------------------
---- UI elements ----
---------------------*/

// Loading screen
const loading = document.querySelector("#loading");
const dashboard = document.querySelector("#dashboard");

// Form
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

// Notification
const notification = document.querySelector("#notification");
const notificationMessage = document.querySelector("#notification-message");
const notificationCloseButton = document.querySelector("#notification-close");

/* -------------------
------- Events -------
---------------------*/

vehicleSettingsCloseButton.addEventListener("click", closeVehicleSettings);
vehicleSettingsCancelButton.addEventListener("click", closeVehicleSettings);
vehicleSettingsSaveButton.addEventListener("click", closeVehicleSettings);
resetFormButton.addEventListener("click", resetForm);
notificationCloseButton.addEventListener("click", hideNotification)

/* -------------------
---- UI functions ----
---------------------*/
function hideLoadingScreen() {
    loading.classList.add("is-hidden")
    dashboard.classList.remove("is-hidden")
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

    fillingLevelInput.value = "";
    fillingLevelInput.dispatchEvent(keyupEvent);
}

function showNotification(message, autoHide = false) {
    notification.classList.remove("is-hidden");
    notification.classList.remove("hide");
    notification.classList.add("show");
    notificationMessage.innerHTML = message;

    if (autoHide) {
        // Hide after 5 seconds
        setTimeout(hideNotification, 4000);
    }
}

function hideNotification() {
    notification.classList.remove("show");
    notification.classList.add("hide");
}

function initOptimizationLoading() {
    optimizeButton.classList.add('is-loading');
    optimizeButton.disabled = true;
    resetFormButton.disabled = true;
}

function endOptimizationLoading() {
    optimizeButton.classList.remove('is-loading');
    optimizeButton.disabled = false;
    resetFormButton.disabled = false;
}

export { hideLoadingScreen, openVehicleSettings, fillingLevelInput, optimizeButton, showNotification, initOptimizationLoading, endOptimizationLoading }