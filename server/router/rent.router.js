import express from "express";
import { rents } from "../handler/rent.controller.js";

const router = express.Router();

router.get("/", rents);

export default router;