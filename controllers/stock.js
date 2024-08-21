import Stock from "../models/stock.js";

export const GetStock = async (req, res) => {
  const userId = req.userid;

  try {
    const stock = await Stock.findOne({ userId });
    if (!stock) {
      const newstock = new Stock({
        userId,
        electronics: 0,
        medicine: 0,
        vegetables: 0,
        others: 0,
      }).save();
      return res.status(200).json({
        success: true,
        stock: newstock,
      });
    }
    res.status(200).json({
      success: true,
      stock: stock,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export const updateStock = async (req, res) => {
  const userId = req.userid;
  const { vegetables, electronics, medicine, others } = req.body;
  try {
    const stock = await Stock.findOne({ userId });
    if (!stock) {
      const updatedStock = new Stock({
        userId,
        electronics: electronics,
        medicine: medicine,
        vegetables: vegetables,
        others: others,
      }).save();
      return res.status(200).json({
        success: true,
        stock: updatedStock,
      });
    }
    const updatedStock = await Stock.findOneAndUpdate(
      { userId },
      { vegetables, electronics, medicine, others },
      { runValidators: true, new: true }
    );
    res.status(200).json({
      success: true,
      stock: updatedStock,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
