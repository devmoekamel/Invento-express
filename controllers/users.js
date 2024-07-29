import { genSalt, hash } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRECT_Key, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const { email, password, type } = req.body;

  if (email || password) {
    res.json(400).json({
      success: false,
      error: "please provide email or password",
    });
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      success: false,
      error: "please provide a valid email",
    });
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).json({
      success: false,
      error: "please provide a strong password",
    });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({
        success: false,
        error: "user already exist",
      });
    }
    const salt = genSalt(10);
    const hashedPassword = hash(password, salt);
    const newUser = await User({
      email,
      password,
      usertype: type,
    }).save();
    const Token = generateToken(newUser._id, type);
    res.status(200).json({
      success: true,
      toke: Token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: "Server error",
    });
  }
};
