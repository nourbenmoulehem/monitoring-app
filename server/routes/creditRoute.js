import express from "express";

import  getCredits  from "../controllers/credit.js";

const router = express.Router();

router.get("/getCredits", getCredits)

export default router;