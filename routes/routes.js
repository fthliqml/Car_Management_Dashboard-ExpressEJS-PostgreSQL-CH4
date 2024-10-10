const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");

router.get("/cars", controller.showAllCars);

router.get("/create-car", controller.showForm);
router.post("/create-car", controller.createCar);

module.exports = router;
