import mongoose from "mongoose"

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      default: "/images/defaultImage.png",
    },
    brand: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
      default: 0,
    },
    countInStock: {
      type: String,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
