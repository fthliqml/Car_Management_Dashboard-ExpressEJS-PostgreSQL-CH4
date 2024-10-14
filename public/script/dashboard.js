const btnAddCar = document.getElementById("btnAddCar");

btnAddCar.addEventListener("click", () => {
    // go to {base-url}/dashboard/create-car
    window.location.href = "cars/add";
});

window.onload = function () {
    const alert = document.getElementById("success-alert");
    if (alert) {
        alert.classList.add("fade-out");

        setTimeout(function () {
            alert.classList.add("hidden");

            // Wait transition to end (1s)
            setTimeout(() => {
                alert.remove(); // delete alert element
            }, 1000);
        }, 2000);
    }
};
