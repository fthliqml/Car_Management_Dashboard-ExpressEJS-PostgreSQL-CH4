const alertPlaceholder = document.getElementById("live-alert");

// Create dynamic alert element
const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("fade-out");
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);

    setTimeout(() => {
        wrapper.classList.add("hidden");

        // Wait animation to end (1s), then delete alert element
        setTimeout(() => {
            wrapper.remove();
        }, 1000);
    }, 2000);
};

const inputImage = document.getElementById("inputImage");

// Add event when user sending file
inputImage.addEventListener("change", function (event) {
    const allowedExt = ["png", "jpg", "jpeg"];
    const filePath = this.value.split(".");
    const ext = filePath[filePath.length - 1].toLowerCase();

    // if ext of file are in array
    if (allowedExt.includes(ext)) {
        return;
    } else {
        appendAlert("Jenis file tidak didukung !", "danger");
        this.value = "";
        // reset event
        event.preventDefault();
    }
});

// Handling button

const inputName = document.getElementById("inputName");
const inputRent = document.getElementById("inputRent");
const submitForm = document.getElementById("submitForm");

submitForm.disabled = true;

const currValue = {
    name: inputName.value,
    rent: inputRent.value,
};

inputName.addEventListener("input", () => {
    inputName.value == currValue.name
        ? (submitForm.disabled = true)
        : (submitForm.disabled = false);
});

inputName.addEventListener("input", () => {
    inputRent.value == currValue.rent
        ? (submitForm.disabled = true)
        : (submitForm.disabled = false);
});
