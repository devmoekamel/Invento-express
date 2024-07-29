import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

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

export default mongoose.mode("User", UserSchema);
