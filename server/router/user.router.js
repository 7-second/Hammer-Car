import express from "express"
import { showUserDetail, updateProfile, users,deleteUser } from "../handler/user.controller.js"
const router = express.Router()

router.get("/", users)
router.delete("/user/:id", deleteUser);
router.get("/show-details/:id", showUserDetail)
router.put("/update-profile/:id", updateProfile)

export default router
