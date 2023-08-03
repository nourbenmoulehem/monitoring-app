import OverallStatClient from "../models/OverallStatClients.js"
import Client from "../models/Client.js";

 export const getClientsStatYearly = async (req, res) =>{
  try {
     // Extract the year from the request query parameters
     console.log(req.params);
     const  { year }  = req.params; // Assuming the year is passed as a query parameter named 'year'

     console.log("🚀 ~ file: clientsStats.js:8 ~ getClientsStatYearly ~ year:", year)

     // Check if the year is a valid number
     if (isNaN(year)) {
       return res.status(400).json({ message: "Invalid year provided." });
     }
 
     /* Overall Client Stats */
     const clientStat = await OverallStatClient.find({ year: year });
    
    const {
      professionStats,
      workSectorStats,
      revenueHistogram,
      genderStats,
      ageStats
    } = clientStat[0]

    console.log("hmm you freaked me out")
    res.status(200).json({
      professionStats,
      workSectorStats,
      revenueHistogram,
      genderStats,
      ageStats
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getMemberShipStats = async (req, res) => {
  try {
    console.log(req.params);
     const  { year }  = req.params;

    /* Overall Client Stats */
    const ClientStat = await OverallStatClient.find({ year: year }).lean().select('membershipTypeStats').lean();

    console.log("🚀 ~ file: clientsStats.js:38 ~ getMemberShipStats ~ ClientStat:", ClientStat)

    res.status(200).json({ ClientStat });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getRevenueHistoStats = async (req, res) => {
  try {
    console.log(req.params);
     const  { year }  = req.params;

    /* Overall Client Stats */
    const ClientStat = await OverallStatClient.find({ year: year }).lean().select('revenueHistogram').lean();

    console.log("🚀 ~ file: clientsStats.js:38 ~ getMemberShipStats ~ ClientStat:", ClientStat[0].revenueHistogram)
    const revenues = ClientStat[0].revenueHistogram;

    res.status(200).json( revenues );

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getProfessionStats = async (req, res) => {
  try {
    console.log(req.params);
     const  { year }  = req.params;

    /* Overall Client Stats */
    const ClientStat = await OverallStatClient.find({ year: year }).lean().select('professionStats').lean();

    console.log("🚀 ~ file: clientsStats.js:38 ~ getMemberShipStats ~ ClientStat:", ClientStat[0].revenueHistogram)
    const profStats = ClientStat[0].professionStats;

    res.status(200).json( profStats );

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getFlagStats = async (req, res) => {
  try {
    console.log(req.params);
     const  { year }  = req.params;

    /* Overall Client Stats */
    const ClientStat = await OverallStatClient.find({ year: year }).lean().select('flagStats').lean();

    console.log("🚀 ~ file: clientsStats.js:38 ~ getMemberShipStats ~ ClientStat:", ClientStat)

    res.status(200).json({ ClientStat });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


