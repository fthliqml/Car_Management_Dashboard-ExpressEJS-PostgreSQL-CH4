const { Car } = require("../models");

async function showAllCars(req, res) {
    try {
        // Delete unused session data (used when updating car data)
        delete req.session.carId;

        // Get client query
        const querySize = req.query.size;

        // Get all cars data in array from database
        const carsData = querySize
            ? await Car.findAll({ where: { size: querySize }, order: [["updatedAt", "DESC"]] })
            : await Car.findAll({ order: [["updatedAt", "DESC"]] });

        // Get information message if there is flash sending in request
        let type;
        let message = null;
        const deleteMsg = req.flash("delete");
        const updateMsg = req.flash("update");

        if (deleteMsg.length !== 0 || updateMsg.length !== 0) {
            // if delete message is empty, then type = success
            type = deleteMsg.length === 0 ? "success" : "danger";
            // if delete message is empty, then message = updateMsg
            message = deleteMsg.length === 0 ? updateMsg : deleteMsg;
        }

        const sortBy = querySize ? querySize : "All";

        // Rendering file with template engines (ejs)
        res.render("pages/dashboard", {
            contentTitle: "List Cars",
            scriptFile: "dashboard.js",
            layout: "layouts/main-layout",
            carsData,
            sortBy,
            alert: {
                type,
                message,
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

async function deleteCarData(req, res, next) {
    try {
        const { id } = req.body;
        // Find car in database
        const car = await Car.findByPk(id);

        // Sending to next middleware
        res.locals.fileId = car.fileId;

        // Removed data from database
        await car.destroy();

        // Sending message for alert purpose
        req.flash("delete", "Data mobil berhasil dihapus !");

        // Go to next middleware
        next();
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
        const { name, rentPerDay, size, image, fileId, createdAt, updatedAt } = req.body;

        // Insert car data into database
        await Car.create({
            name,
            rentPerDay,
            size,
            image,
            fileId,
            createdAt,
            updatedAt,
        });

        // Store information temporary
        req.flash("update", "Data mobil berhasil ditambahkan !");

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
            req.flash("update", "Data mobil berhasil diubah !");
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
    deleteCarData,
};
