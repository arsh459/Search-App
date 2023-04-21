const express = require("express")
const cors = require("cors")
const connectToDatabase = require("./config/db")
require("dotenv").config()
const { addAdsToDatabase, addCompaniesToDatabase } = require("./data/addData")
const { Ad, Company } = require("./model/model")

const app = express()

// Functions for adding Raw data to MongoDB Database
// addAdsToDatabase()
// addCompaniesToDatabase()

// MiddleWares
app.use(cors())
app.use(express.json())
// app.use(express.static("build"))
//Routes

app.get("/api/", async (req, res) => {
  try {
    const { que = "" } = req.query
    const data = await Ad.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "companies",
        },
      },
      {
        $unwind: "$companies",
      },
      {
        $match: {
          $or: [
            { "companies.name": { $regex: que, $options: "i" } },
            {
              primaryText: {
                $regex: que,
                $options: "i",
              },
            },
            {
              headline: { $regex: que, $options: "i" },
            },
            {
              description: {
                $regex: que,
                $options: "i",
              },
            },
          ],
        },
      },
    ])
    return res.send({ data: data })
  } catch (err) {
    return res.send({ message: err.message })
  }
})

//Starting Server and Connecting to Database
app.listen(process.env.SERVER_PORT, async () => {
  await connectToDatabase()
  console.log(
    "Server listening on",
    `http://localhost:${process.env.SERVER_PORT}`
  )
})
