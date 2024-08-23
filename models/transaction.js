import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  exporter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  importer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offerId: {
    type: Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Transaction",TransactionSchema);