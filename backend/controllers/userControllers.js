import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @Description  -  GET All Users
// @Method       -  GET
// @Access       -  Private
// @Route        -  /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw Error("Users not found!")
  }
})

// @Description  -  GET Specific User
// @Method       -  GET
// @Access       -  Private
// @Route        -  /api/users/:id
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw Error("User not found!")
  }
})

// @Description  -  Register New User
// @Method       -  POST
// @Access       -  Public
// @Route        -  /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  const existsUser = await User.findOne({ email })

  if (!existsUser) {
    if (password && firstName && lastName) {
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
      })

      res.status(201).json(newUser)
    } else {
      res.status(404)
      throw Error("All fields must be completed!")
    }
  } else {
    res.status(404)
    throw Error("The email is already taken!")
  }
})

// @Description  -  Login User
// @Method       -  POST
// @Access       -  Public
// @Route        -  /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (email) {
    const existsUser = await User.findOne({ email })

    if (await existsUser.comparePassword(password)) {
      res.status(200).json({
        id: existsUser._id,
        firstName: existsUser.firstName,
        lastName: existsUser.lastName,
        email: existsUser.email,
        isAdmin: existsUser.isAdmin,
        token: generateToken(existsUser._id),
      })
    } else {
      res.status(404)
      throw Error("Invalid email or password!")
    }
  } else {
    res.status(404)
    throw Error("Invalid email or password!")
  }
})

// @Description  -  Update User
// @Method       -  PATCH
// @Access       -  Private
// @Route        -  /api/users/profile/update
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, password } = req.body
  const existsUser = await User.findById(req.user.id)

  if (existsUser) {
    existsUser.firstName = firstName ? firstName : existsUser.firstName
    existsUser.lastName = lastName ? lastName : existsUser.lastName
    existsUser.password = password ? password : existsUser.password

    const updatedUser = await existsUser.save()

    res.status(200).json(updatedUser)
  } else {
    res.status(404)
    throw Error("User not found!")
  }
})

// @Description  -  Delete User
// @Method       -  DELETE
// @Access       -  Private
// @Route        -  /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const existsUser = await User.findById(req.params.id)

  if (existsUser) {
    await existsUser.remove()

    res.status(200).json(`The user with id: ${req.params.id} was deleted!`)
  } else {
    res.status(404)
    throw Error("User not found!")
  }
})

// @Description  -  User Details
// @Method       -  GET
// @Access       -  Private
// @Route        -  /api/users/profile/details
const detailsUser = asyncHandler(async (req, res) => {
  const existsUser = req.user

  if (existsUser) {
    res.status(200).json({
      id: existsUser._id,
      firstName: existsUser.firstName,
      lastName: existsUser.lastName,
      email: existsUser.email,
      isAdmin: existsUser.isAdmin,
    })
  } else {
    res.status(404)
    throw Error("User not found!")
  }
})

export {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
  detailsUser,
}
