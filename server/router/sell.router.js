import express from "express"
import { sells } from "../handler/sell.controller.js"

const router = express.Router()

// need user on params
router.get("/", sells)

export default router