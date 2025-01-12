import express from "express";
import { rentByCar, rents } from "../handler/rent.controller.js";

const router = express.Router();

router.get("/", rents);

router.post("/rented-car", rentByCar)

export default router;