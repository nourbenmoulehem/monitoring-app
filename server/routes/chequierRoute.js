import express from "express";

import  {getChequiers, getChequierCountByEtat, getMonthlyChequierCounts}  from "../controllers/chequier.js";

const router = express.Router();

router.get("/getChequiers", getChequiers)
router.get("/getChequierCountByEtat", getChequierCountByEtat);
router.get("/getMonthlyChequierCounts", getMonthlyChequierCounts);

export default router;