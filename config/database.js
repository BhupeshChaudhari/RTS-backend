const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB connected Successfully");
    })
    .catch((error) => {
      console.log("Error in DB connection");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
