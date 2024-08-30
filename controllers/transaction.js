import Transaction from "../models/transaction.js";

export const getUserTransactions = async (req, res) => {
  const userId = req.userid;
  const usertype = req.usertype;
  console.log(userId);
  try {
    const transactions = await Transaction.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from")
      .populate("to")
      .populate("offerId")
      .exec();

    if (!transactions || transactions.length === 0) {
      return res.status(200).json({
        success: true,
        transactions: [],
      });
    }
    return res.status(200).json({
      success: true,
      transactions: transactions,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: e.message,
    });
  }
};
