import mongoose from "mongoose";
const userTypes = ["seller", "buyer"];

const UserSchema = new mongoose.Schema({
  username: {
    type: "String",
    maxLength: 27,
    required: true,
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
    enum: userTypes,
    required: false,
  },
});

export default mongoose.model("User", UserSchema);
