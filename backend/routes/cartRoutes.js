import express from "express"
import {
  newItemCart,
  detailsCart,
  createCart,
  removeItemCart,
} from "../controllers/cartControllers.js"
import { protectedRoute } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/details").get(protectedRoute, detailsCart)
router.route("/addCart").post(protectedRoute, createCart)
router.route("/addItem").patch(protectedRoute, newItemCart)
router.route("/removeItem").patch(protectedRoute, removeItemCart)

export default router
