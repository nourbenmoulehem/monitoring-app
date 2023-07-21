import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Client from "../models/Client.js"

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ file: general.js:8 ~ getUser ~ id:", id);
    
    const user = await User.findById(id, "-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Client or make it top clients? */
    const clients = await Client.find()
    .limit(10).sort({ createdOn: -1})

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      yearlyTotalClients,
      yearlyTotalNewAccounts,
      yearlyTotalActiveClients,
      yearlyTotalInactiveClients,
      monthlyData,

    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      yearlyTotalClients,
      yearlyTotalNewAccounts,
      yearlyTotalActiveClients,
      yearlyTotalInactiveClients,
      monthlyData,
      thisMonthStats,
      todayStats,
      clients
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
