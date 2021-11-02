import express from "express"
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../controllers/productControllers.js"

const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct)
router.route("/add").post(addProduct)

export default router
