import express from "express";

import  {getVirements, getVirementCountByEtat, getMonthlyTransactionCounts}  from "../controllers/virements.js";   

const router = express.Router();

router.get("/getVirements", getVirements);
router.get("/getVirementCountByEtat", getVirementCountByEtat);
router.get("/getMonthlyTransactionCounts", getMonthlyTransactionCounts);

export default router;