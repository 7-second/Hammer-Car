import express from "express"
import { sellCar } from "../handler/sell.controller.js"

const router = express.Router()

// need user on params
router.post("/", sellCar)

export default router