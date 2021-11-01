import express from "express"
import { createOrder } from "../controllers/orderControllers.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/create").post(protectedRoute, createOrder)

export default router
