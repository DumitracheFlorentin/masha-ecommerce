import express from "express"
import {
  getAllProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productControllers.js"

const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/:id").get(getProduct).delete(deleteProduct)

export default router
