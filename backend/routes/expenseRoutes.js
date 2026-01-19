import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} from "../controllers/expenseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addExpense);
router.get("/list", auth, getExpenses);
router.delete("/delete/:id", auth, deleteExpense);
router.put("/update/:id", auth, updateExpense);

export default router;
