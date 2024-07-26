import mongoose from "mongoose";

export const connectDB = async () => {
  const DBConnection = await mongoose.connect(process.env.MONGO_DB_KEY);
  console.log(DBConnection.connection.host);
};
