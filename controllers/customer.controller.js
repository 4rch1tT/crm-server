const customerModel = require("../models/customer.model");

const getCustomers = async (req, res) => {
  try {
    const customer = await customerModel.find();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const newCustomer = await customerModel.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: "Invalid updte" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customerModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomer) {
      res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({message:"Customer deleted successfully"});
  } catch (error) {
    res.status(500).json({message:"Server error"})
  }
};


module.exports= {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
}