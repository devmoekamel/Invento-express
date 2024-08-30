import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offerId: {
    type: Schema.Types.ObjectId,
    ref: "AOffer",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Transaction",TransactionSchema);