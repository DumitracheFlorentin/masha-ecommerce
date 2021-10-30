import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      image: {
        type: String,
        required: true,
        default: "/images/defaultImage.png",
      },
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
