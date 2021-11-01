import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"

// @Description  -  Create Order
// @Method       -  POST
// @Access       -  Private
// @Route        -  /api/orders/create
const createOrder = asyncHandler(async (req, res) => {
  const user = req.user
  const { id, email, firstName, lastName } = user
  const { phone, address, shippingTax, totalPrice } = req.body

  const existsCart = await Cart.findOne({ userId: id })

  if (existsCart) {
    const products = existsCart.productItems

    const newOrder = await Order.create({
      userId: id,
      firstName,
      lastName,
      email,
      phone,
      address,
      shippingTax,
      totalPrice,
      products,
    })

    res.status(201).json(newOrder)
  } else {
    res.status(404)

    throw Error("Cart not found!")
  }
})

// @Description  -  Delete An Order
// @Method       -  Delete
// @Access       -  Private
// @Route        -  /api/orders/delete
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.body

  const existsOrder = await Order.findById(id)
  const orders = await Order.find({})

  if (existsOrder) {
    await existsOrder.remove()

    res.json(orders)
  } else {
    res.status(404)

    throw Error("Order not found!")
  }
})

// @Description  -  Get All Orders
// @Method       -  Get
// @Access       -  Private
// @Route        -  /api/orders
const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})

  res.json(orders)
})

// @Description  -  Get Orders by userId
// @Method       -  Get
// @Access       -  Private
// @Route        -  /api/orders/specific
const specificOrders = asyncHandler(async (req, res) => {
  const { id } = req.user

  const orders = await Order.find({ userId: id })

  if (orders) {
    res.json(orders)
  } else {
    res.status(404)

    throw Error("The user does not have orders!")
  }
})

export { createOrder, deleteOrder, allOrders, specificOrders }
