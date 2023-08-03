import express from "express";
import {getClientsStatYearly, getMemberShipStats, getFlagStats, getRevenueHistoStats, getProfessionStats} from "../controllers/clientsStats.js"
import { getProfessionPieChart, getAgePieChart, getAgregateTotalClients, getRevenueStats, getCountFlagViso, getAggregateDataByAgeRanges } from "../controllers/aggregateClientStats.js";


const router = express.Router();


router.get("/clientStats/:year", getClientsStatYearly);

router.get("/professionStats", getProfessionPieChart);

router.get("/ageStats", getAgePieChart);

router.get("/totalClients", getAgregateTotalClients);

router.get("/revenueStats", getRevenueStats);

router.get("/membershipStats/:year", getMemberShipStats);

router.get("/getRevenueHistoStats/:year", getRevenueHistoStats);

router.get("/getProfessionStats/:year", getProfessionStats);


router.get("/flagVisio", getCountFlagViso);

router.get("/getAggregateDataByAgeRanges", getAggregateDataByAgeRanges);

router.get("/flagStats/:year", getFlagStats);

export default router;