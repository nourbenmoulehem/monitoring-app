import express from "express";
import {getClientsStatYearly, getMemberShipStats, getFlagStats} from "../controllers/clientsStats.js"
import { getProfessionPieChart, getAgePieChart, getAgregateTotalClients, getRevenueStats, getCountFlagViso, getAggregateDataByAgeRanges } from "../controllers/aggregateClientStats.js";


const router = express.Router();


router.get("/clientStats", getClientsStatYearly);

router.get("/professionStats", getProfessionPieChart);

router.get("/ageStats", getAgePieChart);

router.get("/totalClients", getAgregateTotalClients);

router.get("/revenueStats", getRevenueStats);

router.get("/membershipStats", getMemberShipStats);

router.get("/flagVisio", getCountFlagViso);

router.get("/getAggregateDataByAgeRanges", getAggregateDataByAgeRanges);

router.get("/flagStats", getFlagStats)

export default router;