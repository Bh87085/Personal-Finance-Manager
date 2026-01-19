import express from "express";
import { addGoal, getGoals, addToGoal, deleteGoal } from "../controllers/goalController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addGoal);
router.get("/list", auth, getGoals);
router.post("/add-amount", auth, addToGoal);
router.delete("/delete/:id", auth, deleteGoal);



export default router;
