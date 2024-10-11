const express = require("express");
const router = require("express").Router();
const controller = require("../controller/controller.js");

router.get("/cars", controller.showAllCars);

router.get("/create-car", controller.createForm);
router.post("/create-car", controller.createCarData);

router.get("/update-car", controller.updateForm);
router.patch("/update-car", controller.updateCarData);

module.exports = router;
