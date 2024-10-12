const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");
const { createCarTime, updateCarTime } = require("../middlewares/timestamps.js");

router.get("/cars", controller.showAllCars);

router.get("/create-car", controller.createForm);
router.post("/create-car", createCarTime, controller.createCarData);

router.get("/update-car", controller.updateForm);
router.patch("/update-car", updateCarTime, controller.updateCarData);

module.exports = router;
