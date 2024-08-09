const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing the password",
      });
    }

    const user = await User.create({
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be registered",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user is not resgistered",
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (isPassMatch) {
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const { password: hashPassword, ...rest } = user._doc;

      const expiryDate = new Date(Date.now() + 3600000);

      return res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({
          sucess: true,
          message: "User logged in Successfully",
          data: rest,
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logged in failed",
    });
  }
};
