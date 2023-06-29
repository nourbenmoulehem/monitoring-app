import OverallStatClient from "../models/OverallStatClients.js"
import Client from "../models/Client.js"

 export const getClientsStatYearly = async (req, res) =>{
  try {
    const currentYear = 2023;

    /* Overall Client Stats */
    const ClientStat = await OverallStatClient.find({ year: currentYear });
    console.log("🚀 ~ file: clientsStats.js:10 ~ getClientsStatYearly ~ ClientStat:", ClientStat)
    
    const {
      professionStats,
      workSectorStats,
      revenueHistogram,
      genderStats
    } = ClientStat[0]

    console.log("hmm you freaked me out")
    res.status(200).json({
      professionStats,
      workSectorStats,
      revenueHistogram,
      genderStats
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export default getClientsStatYearly;