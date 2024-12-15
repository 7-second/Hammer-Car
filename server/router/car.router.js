import express from "express"
import { addCar,  getCar, rentcars, sellcars, updateCar } from "../handler/car.controller.js"
const router = express.Router()

router.get("/rent", rentcars)
router.get("/sell", sellcars)
router.get("/:id", getCar)
router.put("/:id/:owner", updateCar)
router.post("/add-car", addCar)

export default router