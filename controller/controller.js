const { Car } = require("../models");

async function showAllCars(req, res) {
    try {
        // Get all cars data in array from database
        const carsData = await Car.findAll();

        // Rendering file with template engines (ejs)
        res.render("pages/dashboard", {
            contentTitle: "List Cars",
            scriptFile: "dashboard.js",
            layout: "layouts/main-layout",
            carsData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

function deleteCar(req, res) {
    try {
        console.log(req.body);
        // Redirect to {baseUrl}/dashboard
        res.status(200).redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to delete car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

function createForm(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/create-car", {
            contentTitle: "Add New Car",
            scriptFile: "create-car.js",
            layout: "layouts/main-layout",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to show form",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function createCarData(req, res) {
    try {
        const { carName, rentPerDay, carSize, carImage, createdAt, updatedAt } = req.body;

        // Inser car data into database
        await Car.create({
            carName,
            rentPerDay,
            carSize,
            carImage,
            createdAt,
            updatedAt,
        });

        // Redirect to {baseUrl}/dashboard
        res.status(200).redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to create car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

function updateForm(req, res) {
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/update-car", {
            contentTitle: "Update Car Information",
            scriptFile: "update-car.js",
            layout: "layouts/main-layout",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to show form",
            isSuccess: false,
            error: error.message,
        });
    }
}

function updateCarData(req, res) {
    try {
        console.log(req.body);
        // Redirect to {baseUrl}/dashboard
        res.status(200).redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Failed to update car data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    showAllCars,
    createForm,
    createCarData,
    updateForm,
    updateCarData,
    deleteCar,
};
