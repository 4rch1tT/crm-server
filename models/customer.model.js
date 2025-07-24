const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    phone_no: { type: String, required: true}
})

const customer = mongoose.model('customer', customerSchema)

module.exports = customer