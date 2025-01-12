import express from "express";
import { sells, sellCar } from "../handler/sell.controller.js";

const router = express.Router();

// need user on params
router.get("/", sells);

router.post("/car-sell", sellCar);

export default router;
