const express = require("express");
const customerRouter = express.Router();

const {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customer.controller");
const customer = require("../models/customer.model");

customerRouter.get("",getCustomers)
customerRouter.post("",createCustomer)
customerRouter.put("/:id",updateCustomer)
customerRouter.delete("/:id",deleteCustomer)

module.exports = customerRouter