import express from "express"
import {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  detailsUser,
} from "../controllers/userControllers.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getAllUsers)
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile/details").get(protectedRoute, detailsUser)

export default router
