import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productItems: [
    {
      qty: {
        type: Number,
        required: true,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
