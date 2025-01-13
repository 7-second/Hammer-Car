import express from "express"
import { addCar, cars, getCar, updateCar ,deleteCar } from "../handler/car.controller.js"
const router = express.Router()

router.get("/", cars); // Get all cars
router.get("/:id", getCar); // Get a specific car by ID
router.put("/:id/:owner", updateCar); // Update a car by ID
router.post("/add-car", addCar); // Add a new car
router.delete("/:id", deleteCar); // Delete a car by ID


export default router