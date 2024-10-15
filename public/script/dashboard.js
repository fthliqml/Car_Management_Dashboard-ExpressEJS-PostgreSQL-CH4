const btnAddCar = document.getElementById("btnAddCar");

btnAddCar.addEventListener("click", () => {
    // go to {base-url}/dashboard/create-car
    window.location.href = "cars/add";
});

window.onload = function () {
    const alert = document.getElementById("live-alert");
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

const modalSave = document.getElementById("modalSave");

// Add event in modal's button save
modalSave.addEventListener("click", async function (event) {
    const itemId = this.getAttribute("data-id");
    try {
        // Fetching API with delete method
        const response = await fetch("/cars", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: itemId }),
        });

        if (response.ok) {
            // Reload page
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
});

// Setting data-id in modal's save button
document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        modalSave.setAttribute("data-id", button.getAttribute("data-id"));
    });
});
