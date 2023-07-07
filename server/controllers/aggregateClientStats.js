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

export const getRevenueStats = async(req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          revenue: { $exists: true } // Filter documents with the 'revenue' field
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ["$revenue", 0] }, { $lt: ["$revenue", 700] }] }, then: "0-700" },
                { case: { $and: [{ $gte: ["$revenue", 700] }, { $lt: ["$revenue", 1600] }] }, then: "700-1600" },
                { case: { $and: [{ $gte: ["$revenue", 1600] }, { $lt: ["$revenue", 3500] }] }, then: "1600-3500" },
                { case: { $gte: ["$revenue", 3500] }, then: "3500+" }
              ],
              default: "Unknown"
            }
          },
          count: { $sum: 1 }
        }
      }
    ]

    const result = await Client.collection.aggregate(pipeline).toArray();

    console.log(result)
    res.status(200).json(result);

    
  } catch (error) {
    console.error('Failed to execute the aggregation:', error);
    return res.status(500).json({ error: 'Failed to execute the aggregation' });
  }
}


export const getAgePieChart = async (req, res) => {
  try {
    // MongoDB aggregation pipeline
    const pipeline = [
      {
        $group: {
          _id: null,
          ageCounts: { $push: "$age" },
          totalCount: { $sum: 1 }
        }
      },
      {
        $unwind: "$ageCounts"
      },
      {
        $group: {
          _id: "$ageCounts",
          count: { $sum: 1 },
          totalCount: { $first: "$totalCount" }
        }
      },
      {
        $project: {
          label: "$_id",
          value: { $multiply: [{ $divide: ["$count", "$totalCount"] }, 100] },
          _id: 0
        }
      },
      {
        $sort: {
          label: 1
        }
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

export const getAgregateTotalClients = async (req, res) => {

    // MongoDB aggregation pipeline
    const entryCount = await Client.countDocuments();

    console.log("Entry Count:", entryCount);

    res.status(200).json({ entryCount });
 

}
