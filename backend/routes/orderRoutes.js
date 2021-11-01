import express from "express"
import {
  createOrder,
  deleteOrder,
  allOrders,
  specificOrders,
} from "../controllers/orderControllers.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(allOrders)
router.route("/create").post(protectedRoute, createOrder)
router.route("/delete").delete(deleteOrder)
router.route("/specific").get(protectedRoute, specificOrders)

export default router
