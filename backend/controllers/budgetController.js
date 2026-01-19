// controller/budgetController.js
import Budget from "../models/Budget.js";

export const setBudget = async (req, res) => {
  try {
    const { userId, limit } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId },              // find by user
      { limit },               // replace value
      { upsert: true, new: true } // create if not exists
    );

    res.json(budget);
  } catch {
    res.status(400).json({ error: "Budget not saved" });
  }
};

export const getBudget = async (req, res) => {
  const { userId } = req.query;
  const budget = await Budget.findOne({ userId });
  res.json(budget);
};
