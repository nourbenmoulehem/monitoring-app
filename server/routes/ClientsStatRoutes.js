import express from "express";
import {getClientsStatYearly, getMemberShipStats} from "../controllers/clientsStats.js"
import { getProfessionPieChart, getAgePieChart, getAgregateTotalClients, getRevenueStats, getCountFlagViso } from "../controllers/aggregateClientStats.js";


const router = express.Router();


router.get("/clientStats", getClientsStatYearly);

router.get("/professionStats", getProfessionPieChart);

router.get("/ageStats", getAgePieChart)

router.get("/totalClients", getAgregateTotalClients)

router.get("/revenueStats", getRevenueStats)

router.get("/membershipStats", getMemberShipStats)

router.get("/flagVisio", getCountFlagViso)

export default router;