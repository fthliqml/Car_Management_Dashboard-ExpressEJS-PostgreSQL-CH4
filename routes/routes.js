const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");
const { createCarTime, updateCarTime } = require("../middlewares/timestamps.js");
const fileFilter = require("../middlewares/fileFilter.js");
const serverUpload = require("../middlewares/uploader");

// Show dashboard
router.get("/", controller.showAllCars);
// Handling update car data
router.patch("/", updateCarTime, controller.updateCarData);
// Handling create car data
router.post("/", fileFilter.single("image"), serverUpload, createCarTime, controller.createCarData);

// Show pages create car form
router.get("/add", controller.createForm);

// Show pages update car form
router.get("/:id/edit", controller.updateForm);

module.exports = router;
