import mongoose from "mongoose"

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log("Database is connected!!!".cyan.bold)
  } catch (error) {
    console.log(error)
  }
}

export default databaseConnection
