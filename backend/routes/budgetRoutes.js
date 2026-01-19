// routes/budgetRoutes.js
import express from "express";
import { setBudget, getBudget } from "../controllers/budgetController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/set", auth, setBudget);
router.get("/get", auth, getBudget);

export default router;
