import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @Description  -  GET All Products
// @Method       -  GET
// @Access       -  Public
// @Route        -  /api/products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products) {
    res.status(200).json(products)
  } else {
    res.status(404)
    throw Error("Products not found!")
  }
})

// @Description  -  GET Specific Product
// @Method       -  GET
// @Access       -  Public
// @Route        -  /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw Error("Product not found!")
  }
})

// @Description  -  Delete Product
// @Method       -  DELETE
// @Access       -  Private
// @Route        -  /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const existsProduct = await Product.findById(req.params.id)

  if (existsProduct) {
    await existsProduct.remove()

    res.status(200).json(`The product with id: ${req.params.id} was deleted!`)
  } else {
    res.status(404)
    throw Error("Product not found!")
  }
})

export { getAllProducts, getProduct, deleteProduct }
