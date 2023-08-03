import express from "express";

import  {getCredits, getMontantCreditStats, getCreditCountByEtat, getCreditCountByType}  from "../controllers/credit.js";

const router = express.Router();

router.get("/getCredits", getCredits);
router.get("/getMontantCreditStats", getMontantCreditStats);
router.get("/getCreditCountByEtat", getCreditCountByEtat);
router.get("/getCreditCountByType", getCreditCountByType);

export default router;