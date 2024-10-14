const { Car } = require("../models");

async function showAllCars(req, res) {
    try {
        // Delete unused session data (used when updating car data)
        delete req.session.carId;

        // Get all cars data in array from database
        const carsData = await Car.findAll({
            order: [["updatedAt", "DESC"]],
        });
        // Get information message if flash success in array
        const successMsg = req.flash("success");

        // Rendering file with template engines (ejs)
        res.render("pages/dashboard", {
            contentTitle: "List Cars",
            scriptFile: "dashboard.js",
            layout: "layouts/main-layout",
            carsData,
            alert: {
                successMsg,
            },
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
        // Redirect to {baseUrl}/cars
        res.status(200).redirect("/cars");
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

function createPage(req, res) {
    const car = {
        name: "",
        rentPerDay: "",
        size: "",
        image: "",
    };
    try {
        // Rendering file with template engines (ejs)
        res.render("pages/form", {
            contentTitle: "Add New Car",
            scriptFile: "create-car.js",
            layout: "layouts/main-layout",
            formAction: "/cars",
            isUpdate: false,
            car,
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
        const { name, rentPerDay, size, image, createdAt, updatedAt } = req.body;

        // Insert car data into database
        await Car.create({
            name,
            rentPerDay,
            size,
            image,
            createdAt,
            updatedAt,
        });

        // Store information temporary
        req.flash("success", "Data mobil berhasil ditambahkan !");

        // Redirect to {baseUrl}/cars
        res.status(200).redirect("/cars");
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

async function updatePage(req, res) {
    try {
        const id = req.params.id;

        // Save car id in session temporary
        req.session.carId = id;

        // Find data by ID in database
        const car = await Car.findByPk(id);

        // Rendering file with template engines (ejs)
        res.render("pages/form", {
            contentTitle: "Update Car Information",
            scriptFile: "update-car.js",
            layout: "layouts/main-layout",
            formAction: `/cars?_method=PATCH`,
            isUpdate: true,
            car,
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

async function updateCarData(req, res) {
    try {
        // Get car id from session
        const id = req.session.carId;

        // Find data by ID in database
        const currentCar = await Car.findByPk(id);
        // Get updated car data
        const newCar = req.body;

        // Updating data
        currentCar.name = newCar.name;
        currentCar.rentPerDay = parseInt(newCar.rentPerDay);
        currentCar.size = newCar.size;
        currentCar.image = newCar.image || currentCar.image; // Ternary => Use newCar.image if data exist, otherwise use currentCar.image

        // Check if data is changing
        if (currentCar.changed()) {
            // Store information temporary
            req.flash("success", "Data mobil berhasil diubah !");
        }

        // Saving update to database, automatically check if car's data has changed or not
        await currentCar.save();

        // Redirect to {baseUrl}/cars
        res.status(200).redirect("/cars");
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
    createPage,
    createCarData,
    updatePage,
    updateCarData,
    deleteCar,
};
