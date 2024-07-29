import mongoose from "mongoose";
const StockSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vegtabales: {
    type: "Number",
    default: 0,
  },
  electronics: {
    type: "Number",
    default: 0,
  },
  medicine: {
    type: "Number",
    default: 0,
  },
  others: {
    type: "Number",
    default: 0,
  },
});

export default mongoose.model("Stock", StockSchema);
