import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, date } = req.body;
    const exp = await Expense.create({ userId, title, amount, category, date });
    res.json(exp);
  } catch {
    res.status(400).json({ error: "Expense not added" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    const list = await Expense.find({ userId }).sort({ date: -1 });
    res.json(list);
  } catch {
    res.status(500).json({ error: "Cannot load expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ error: "Delete failed" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const exp = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true }
    );
    res.json(exp);
  } catch {
    res.status(400).json({ error: "Update failed" });
  }
};
