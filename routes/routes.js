const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");
const { createCarTime, updateCarTime } = require("../middlewares/timestamps.js");
const fileFilter = require("../middlewares/fileFilter.js");
const serverUpload = require("../middlewares/uploader");

// Show dashboard
router.get("/", controller.showAllCars);

// Show pages create car form
router.get("/create-car", controller.createForm);
// Handling create car data
router.post(
    "/create-car",
    fileFilter.single("image"),
    serverUpload,
    createCarTime,
    controller.createCarData
);

// Show pages update car form
router.get("/update-car", controller.updateForm);
// Handling update car data
router.patch("/update-car", updateCarTime, controller.updateCarData);

module.exports = router;
