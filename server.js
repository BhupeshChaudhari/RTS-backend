const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

//db
const connectDB = require("./config/database");
connectDB();

app.use(express.json());
app.use(cookieParser());

//routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
