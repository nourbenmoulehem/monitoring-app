import express from "express";

import  getVirements  from "../controllers/virements.js";

const router = express.Router();

router.get("/getVirements", getVirements);

export default router;