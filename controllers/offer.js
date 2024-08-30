import Aoffer from "../models/Aoffer.js";
import offer from "../models/offer.js";
import stock from "../models/stock.js";
import transaction from "../models/transaction.js";

export const addOffer = async (req, res) => {
  const userId = req.userid;
  const usertype = req.usertype;
  const { offerName, offerType, offerAmount, offerPrice } = req.body;

  try {
    // Find the user's stock
    const userStock = await stock.findOne({ userId });
    // Debugging information
    "Stock Object:", userStock;

    if (!userStock) {
      return res.status(404).json({
        success: false,
        error: "User stock not found",
      });
    }

    // Check if there is enough stock to make the offer
    if (userStock[offerType] < offerAmount) {
      return res.status(400).json({
        success: false,
        error: "Not enough amount to make the offer",
      });
    }

    // Prepare the update object
    const updateObject = {
      [offerType]: userStock[offerType] - offerAmount,
    };
    "hena", userStock.offerType;
    // Update the user's stock
    await stock.findOneAndUpdate(
      { userId },
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    // Create a new offer
    const newOffer = new offer({
      userId,
      offerName,
      offerAmount,
      offerPrice,
      offerType,
    });

    await newOffer.save();

    return res.status(201).json({
      success: true,
      message: "Offer added successfully",
    });
  } catch (e) {
    // Error handling
    console.error("Error adding offer:", e);
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

export const getAllOffers = async (req, res) => {
  const userId = req.userid;

  try {
    const offers = await offer.find({}).populate("userId").exec();

    return res.status(200).json({
      success: true,
      offers: offers,
    });
  } catch (e) {
    return res.status(400).json({
      success: true,
      error: e.message,
    });
  }
};

export const getUserOffers = async (req, res) => {
  const userId = req.userid;

  try {
    const offers = await offer.findOne({ userId }).populate("userId").exec();

    if (!offers) {
      return res.status(200).json({
        success: true,
        offers: [],
      });
    }
    return res.status(200).json({
      success: true,
      offers: offers,
    });
  } catch (e) {
    return res.status(400).json({
      success: true,
      error: e.message,
    });
  }
};

export const acceptOffer = async (req, res) => {
  const { offerId } = req.body;
  const userId = req.userid;

  try {
    const existedOffer = await offer.findById(offerId);
    existedOffer;
    if (!existedOffer) {
      return res.status(404).json({
        success: false,
        error: "Offer not found",
      });
    }

    const userStock = await stock.findOne({ userId });

    const updateField = existedOffer.offerType;
    const updateAmount = existedOffer.offerAmount;

    const updateObject = {};
    updateObject[updateField] = userStock[updateField] + updateAmount;

    await stock.findOneAndUpdate(
      { userId },
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    const acceptedOffer = new Aoffer({
      userId: existedOffer.userId,
      offerType: existedOffer.offerType,
      offerAmount: existedOffer.offerAmount,
      offerName: existedOffer.offerName,
      offerPrice: existedOffer.offerPrice,
    });
    await acceptedOffer.save();
    await new transaction({
      offerId: acceptedOffer._id,
      from: existedOffer.userId,
      to: userId,
    }).save();
    await existedOffer.deleteOne();
    res.status(200).json({
      success: true,
      message: "Offer accepted and stock updated successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};
