import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: "String",
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  usertype: {
    type: "String",
    required: true,
  },
});
