import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const { genSaltSync, hashSync } = bcrypt;

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRECT_Key, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const { email, password, username, usertype } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      error: "please provide email or password or username",
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
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      userType: usertype,
    }).save();

    const Token = generateToken(newUser._id, newUser.username);
    // res.cookie("token", Token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict", // Prevents CSRF attacks
    // });
    res.status(200).json({
      success: true,
      token: Token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "please provide email or password",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = generateToken(user._id, user.username);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict", // Prevents CSRF attacks
    // });
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: "Server interal error",
    });
  }
};
