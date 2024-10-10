const inputFoto = document.getElementById("inputFoto");

inputFoto.addEventListener("change", function () {
    const image = this.files[0];
    console.log(image);
});
