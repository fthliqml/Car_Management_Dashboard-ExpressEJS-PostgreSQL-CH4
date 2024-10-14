const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");
const createCarTime = require("../middlewares/timestamps.js");
const fileFilter = require("../middlewares/fileFilter.js");
const serverUpload = require("../middlewares/uploader");

// Show dashboard
router.get("/", controller.showAllCars);
// Handling create car data
router.post("/", fileFilter.single("image"), serverUpload, createCarTime, controller.createCarData);
// Handling update car data
router.patch("/", fileFilter.single("image"), serverUpload, controller.updateCarData);

// Show pages create car form
router.get("/add", controller.createPage);
// Show pages update car form
router.get("/:id/edit", controller.updatePage);

module.exports = router;
