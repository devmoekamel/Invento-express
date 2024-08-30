import mongoose, { Schema } from "mongoose";
const offerTypes = ["food", "electronics", "medicine", "others"];

const AOfferSchema = new mongoose.Schema({
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
    enum: offerTypes,
    required: true,
  },
  offerAmount: {
    type: "Number",
    required: true,
  },
  offerPrice: {
    type: "Number",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AOffer", AOfferSchema);
