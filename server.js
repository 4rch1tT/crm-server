const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
const mongoConnection = process.env.MONGODB_URI;

const userRouter = require("./routes/user.router");
const customerRouter = require("./routes/customer.router")

mongoose
  .connect(mongoConnection)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Error connecting", err);
  });

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRouter);
app.use("/customer",customerRouter)
app.get("/", (req, res) => {
  res.send("CRM Backend API is running");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
