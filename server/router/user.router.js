import express from "express"
import { showUserDetail, updateProfile, users,deleteUser,followOrganization, unfollowOrganization } from "../handler/user.controller.js"
const router = express.Router()

router.get("/", users)
router.delete("/user/:id", deleteUser);
router.get('/show-details/:id', showUserDetail); 
router.put("/update-profile/:id", updateProfile)

router.post("/follow/:userId", followOrganization);  // Follow organization
router.post("/unfollow/:userId", unfollowOrganization);  // Unfollow organization

export default router
