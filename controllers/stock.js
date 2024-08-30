import Stock from "../models/stock.js";
import user from "../models/user.js";

export const GetStock = async (req, res) => {
  const userId = req.userid;

  try {
    const stock = await Stock.findOne({ userId }).populate("userId");
    const existedUser = await user.findById(userId);
    if (existedUser) {
      if (!stock) {
        const newstock = await new Stock({
          userId,
          electronics: 0,
          medicine: 0,
          food: 0,
          others: 0,
        }).save();
        const stock = await Stock.findById(newstock._id).populate("userId");
        return res.status(200).json({
          success: true,
          stock: stock,
        });
      }

      res.status(200).json({
        success: true,
        stock: stock,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "user doesn't exist",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};

export const updateStock = async (req, res) => {
  const userId = req.userid;
  const { food, electronics, medicine, others } = req.body;
  try {
    const stock = await Stock.findOne({ userId });
    if (!stock) {
      const updatedStock = new Stock({
        userId,
        electronics: electronics,
        medicine: medicine,
        food: food,
        others: others,
      })
        .populate("userId")
        .save();
      return res.status(200).json({
        success: true,
        stock: updatedStock,
      });
    }
    const updatedStock = await Stock.findOneAndUpdate(
      { userId },
      { food, electronics, medicine, others },
      { runValidators: true, new: true }
    ).populate("userId");
    res.status(200).json({
      success: true,
      stock: updatedStock,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};
