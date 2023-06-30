import Client from "../models/Client.js";

export const getProfessionPieChart = async (req, res) => {
  try {
    // MongoDB aggregation pipeline
    const pipeline = [
      { $sample: { size: 1000 } },
      {
        $group: {
          _id: "$Profession",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          label: "$_id",
          value: "$count",
          _id: 0
        }
      },
      {
        $sort: {
          value: -1
        }
      },
      {
        $limit: 5000
      }
    ];

    const result = await Client.collection.aggregate(pipeline).toArray();
    console.log("the array ", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to execute the aggregation:', error);
    return res.status(500).json({ error: 'Failed to execute the aggregation' });
  }
};

export default getProfessionPieChart;
