const errorMessage = (req, res, next) => {
  const error = new Error("Not Found!")
  res.status(400)

  next(error)
}

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : 200

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.PROJECT_TYPE === "product" ? null : err.stack,
  })
}

export { errorMessage, errorHandlerMiddleware }
