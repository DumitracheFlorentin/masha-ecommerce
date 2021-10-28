import express from "express"
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  addProduct,
} from "../controllers/productControllers.js"

const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/:id").get(getProduct).delete(deleteProduct)
router.route("/add").post(addProduct)

export default router
