// const { Car } = require("../models");

const path = require("path");

function showAllCars(req, res) {
    try {
        res.sendFile(path.join(__dirname, "../public/cars.html"));
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
        res.sendFile(path.join(__dirname, "../public/createCar.html"));
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
