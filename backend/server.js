import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import databaseConnection from "./config/database.js"

// Config Dotenv
dotenv.config()

// Init Server
const app = express()

// Database
databaseConnection()

// Allowed to send json data from frontend to the server
app.use(express.json())

// Routes

// Middlewares

// Listen Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `The server is in ${process.env.PROJECT_TYPE} mode and running on PORT ${PORT}`
      .yellow.bold
  )
})
