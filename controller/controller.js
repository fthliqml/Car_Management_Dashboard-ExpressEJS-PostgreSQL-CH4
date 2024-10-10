// const { Car } = require("../models");

function showAllCars(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/cars", {
            contentTitle: "List Cars",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

function showForm(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/createCar", {
            contentTitle: "Add New Car",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "500",
            message: "Failed to show form",
            isSuccess: false,
            error: error.message,
        });
    }
}

function createCar(req, res) {
    try {
        console.log(req.body);
        // Redirect to {baseUrl}/cars
        res.status(200).redirect("/cars");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "500",
            message: "Failed to create car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    showAllCars,
    showForm,
    createCar,
};
