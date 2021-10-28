import express from "express"
import {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers.js"

const router = express.Router()

// User Routes
router.route("/").get(getAllUsers)
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// Product Routes

export default router
