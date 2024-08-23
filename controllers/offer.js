import offer from "../models/offer.js";
import stock from "../models/stock.js";
import transaction from "../models/transaction.js";

export const addOffer = async (req, res) => {
  const userId = req.userid;
  const usertype = req.usertype;
  const { offerName, offerType, offerAmout, offerPrice } = req.body;
  try {
    const stock = await stock.findOne({ userId });
    console.log("Stock Object:", stock.offerType);
    console.log("Offer Type:", offerType);
    // Check if the stock exists
    if (!stock) {
      return res.status(400).json({
        success: false,
        message: "Stock not found for this user.",
      });
    }
    if (stock[offerType] < offerAmout) {
      return res.status(400).json({
        success: false,
        message: "not enough amount to can do the offer",
      });
    }
    const newOffer = await new offer({
      userId: userId,
      offerName: offerName,
      offerAmout: offerAmout,
      offerPrice: offerPrice,
      offerType: offerType,
    }).save();
    res.status(201).json({
      success: true,
      message: "offer added",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const getAllOffers = async (req, res) => {
  const userId = req.userid;

  try {
    const offers = await offer.find({});

    return res.status(200).json({
      success: true,
      offers: offers,
    });
  } catch (e) {
    return res.status(400).json({
      success: true,
      message: e.message,
    });
  }
};

export const getUserOffers = async (req, res) => {
  const userId = req.userid;

  try {
    const offers = await offer.findOne({ userId });

    if(!offers)
    {
      return res.status(200).json({
        success:true,
        offers:[]
      })
    }
    return res.status(200).json({
      success: true,
      offers: offers,
    });
  } catch (e) {
    return res.status(400).json({
      success: true,
      message: e.message,
    });
  }
};

export const acceptOffer = async (req, res) => {
  const { offerid } = req.body;
  const userId = req.userid;

  try {
    const existedOffer = await offer.findById(offerid);
    if (!existedOffer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    const userStock = await stock.findOne({ userId });

    const updateField = existedOffer.offerType;
    const updateAmount = existedOffer.offerAmout;

    const updateObject = {};
    updateObject[updateField] = userStock[updateField] + updateAmount;

    const updatedStock = await stock.findOneAndUpdate(
      { userId },
      { $set: updateObject },
      { new: true, runValidators: true }
    );
    const newtransaction =  await new transaction({
      offerId:offerid,
      exporter:existedOffer._id,
      importer:userId 
    }).save();
    await existedOffer.deleteOne();
    res.status(200).json({
      success: true,
      message: "Offer accepted and stock updated successfully",
      updatedStock,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
