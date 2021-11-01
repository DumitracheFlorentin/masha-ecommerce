import asyncHandler from "express-async-handler"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

// @Description  -  Get Details About Specific Cart
// @Method       -  GET
// @Access       -  Private
// @Route        -  /api/carts/details
const detailsCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const existsCart = await Cart.findOne({ userId })

  if (existsCart) {
    res.status(200).json(existsCart)
  } else {
    res.status(404)

    throw Error("Cart not found!")
  }
})

// @Description  -  Create Cart When Someone Create An Account
// @Method       -  POST
// @Acccess      -  Private
// @Route        -  /api/carts/addCart
const createCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const existsCart = await Cart.findOne({ userId })

  if (!existsCart) {
    const newCart = await Cart.create({
      userId,
      productItems: [],
    })

    res.status(201).json(newCart)
  } else {
    res.status(400)

    throw Error("Cart already exists!!!")
  }
})

// @Description  -  Push New Item To Existing Cart
// @Method       -  PATCH
// @Access       -  PRIVATE
// @Route        -  /api/carts/addItem
const newItemCart = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { productId, qty } = req.body

  const existsCart = await Cart.findOne({ userId })
  const existsProduct = await Product.findById(productId)
  const { image, name, price } = existsProduct

  if (existsCart) {
    let ok = 0
    existsCart.productItems.map((item) => {
      if (item.productId == productId) {
        item.qty += parseInt(qty)
        ok = 1
      }
    })

    if (ok === 0) {
      existsCart.productItems.push({ productId, image, name, qty, price })
    }

    const updatedCart = await existsCart.save()

    res.status(204).json({ info: updatedCart })
  } else {
    res.status(404)

    throw Error("Cart not found!")
  }
})

export { detailsCart, createCart, newItemCart }
