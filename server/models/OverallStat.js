import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    yearlyTotalClients: Number,
    yearlyTotalActiveClients: Number,
    yearlyTotalInactiveClients: Number,
    yearlyWeStartClients : Number,
    yearlyWeTrustClients : Number,
    yearlyTotalNewAccounts : Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalClients: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalClients: Number,
      },
    ],
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
