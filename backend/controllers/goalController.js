import Goal from "../models/Goal.js";

export const addGoal = async (req, res) => {
  const { userId, title, targetAmount, type } = req.body;
  const g = await Goal.create({ userId, title, targetAmount, type });
  res.json(g);
};

export const getGoals = async (req, res) => {
  const { userId } = req.query;
  const list = await Goal.find({ userId });
  res.json(list);
};

export const addToGoal = async (req, res) => {
  const { goalId, amount } = req.body;
  const g = await Goal.findById(goalId);
  g.savedAmount += Number(amount);
  await g.save();
  res.json(g);
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    await Goal.findByIdAndDelete(id);
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: "Cannot delete goal" });
  }
};
