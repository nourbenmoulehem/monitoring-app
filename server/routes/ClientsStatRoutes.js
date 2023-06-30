import express from "express";
import getClientsStatYearly from "../controllers/clientsStats.js"
import getProfessionPieChart from "../controllers/aggregateClientStats.js"


const router = express.Router();


router.get("/clientStats", getClientsStatYearly);

router.get("/professionStats", getProfessionPieChart)

export default router;