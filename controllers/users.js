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
  const { email, password, usertype } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "please provide email or password",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "please provide a valid email",
    });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      error: "please provide a strong password",
    });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        error: "user already exist",
      });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const newUser = await new User({
      email,
      password: hashedPassword,
      userType: usertype,
    }).save();

    const Token = generateToken(newUser._id, newUser.userType);
    res.status(200).json({
      success: true,
      toke: Token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};
