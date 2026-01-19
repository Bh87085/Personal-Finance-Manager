import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, age, profession, photo } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, age, profession, photo },
    { new: true }
  ).select("-password");

  res.json(user);
};
