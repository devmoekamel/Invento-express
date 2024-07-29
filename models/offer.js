import mongoose, { Schema } from "mongoose";

const OfferSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offerName: {
    type: "String",
    required: true,
  },
  offerType: {
    type: "String",
    required: true,
  },
  offerAmout: {
    type: "Number",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Offer", OfferSchema);
