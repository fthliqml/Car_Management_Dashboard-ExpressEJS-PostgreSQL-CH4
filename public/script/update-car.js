const alertPlaceholder = document.getElementById("live-alert");
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

        // Tunggu sampai animasi selesai (0.5s), lalu hapus elemen
        setTimeout(() => {
            wrapper.remove();
        }, 1000);
    }, 2000);
};

const inputImage = document.getElementById("inputImage");

inputImage.addEventListener("change", function (event) {
    const allowedExt = ["png", "jpg", "jpeg"];
    const filePath = this.value.split(".");
    const ext = filePath[filePath.length - 1].toLowerCase();
    if (allowedExt.includes(ext)) {
        return;
    } else {
        appendAlert("Jenis file tidak didukung !", "danger");
        this.value = "";
        event.preventDefault();
    }
});
