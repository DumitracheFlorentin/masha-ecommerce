import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import databaseConnection from "./config/database.js"
import {
  errorMessage,
  errorHandlerMiddleware,
} from "./middleware/errorMiddleware.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

// Config Dotenv
dotenv.config()

// Init Server
const app = express()

// Database
databaseConnection()

// Allowed to send json data from frontend to the server
app.use(express.json())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)

// Middlewares
app.use(errorMessage)
app.use(errorHandlerMiddleware)

// Listen Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `The server is in ${process.env.PROJECT_TYPE} mode and running on PORT ${PORT}`
      .yellow.bold
  )
})
