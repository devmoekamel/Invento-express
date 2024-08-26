import mongoose, { Schema } from "mongoose";
const offerTypes = ["Food", "Electronics", "Medicine", "Others"];

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
    enum:offerTypes,
    required: true,
  },
  offerAmout: {
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

export default mongoose.model("Offer", OfferSchema);
