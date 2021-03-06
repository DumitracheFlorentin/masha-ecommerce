import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protectedRoute = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decodedToken.id).select("-password")

      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorizated!")
    }
  } else {
    res.status(404)
    throw Error("No token found!")
  }

  if (!token) {
    res.status(404)
    throw Error("No token found!")
  }
})

export { protectedRoute }
