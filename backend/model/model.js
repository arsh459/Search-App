const mongoose = require("mongoose")

// ad Model
const adSchema = new mongoose.Schema({
  _id: Number,
  companyId: Number,
  primaryText: String,
  headline: String,
  description: String,
  CTA: String,
  imageUrl: String,
})
const Ad = mongoose.model("Ad", adSchema)
Ad.createIndexes({
  primaryText: "text",
  headline: "text",
  description: "text",
})

// company Model
const companySchema = new mongoose.Schema({
  _id: Number,
  name: String,
  url: String,
})
const Company = mongoose.model("Company", companySchema)
Company.createIndexes({
  name: "text",
})

module.exports = {
  Company,
  Ad,
}
