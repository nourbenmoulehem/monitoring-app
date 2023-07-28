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

export const getRevenueStats = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          revenue: { $exists: true }, // Filter documents with the 'revenue' field
        },
      },
      {
        $addFields: {
          revenueInt: { $toInt: "$revenue" }, // Convert 'revenue' to integer
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ["$revenueInt", 0] }, { $lt: ["$revenueInt", 700] }] }, then: "0-700" },
                { case: { $and: [{ $gte: ["$revenueInt", 700] }, { $lt: ["$revenueInt", 1600] }] }, then: "700-1600" },
                { case: { $and: [{ $gte: ["$revenueInt", 1600] }, { $lt: ["$revenueInt", 3500] }] }, then: "1600-3500" },
                { case: { $gte: ["$revenueInt", 3500] }, then: "3500+" },
              ],
              default: "Unknown",
            },
          },
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Client.collection.aggregate(pipeline).toArray();
    console.log("🚀 ~ file: aggregateClientStats.js:67 ~ getRevenueStats ~ result:", result);

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to execute the aggregation:', error);
    return res.status(500).json({ error: 'Failed to execute the aggregation' });
  }
};



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

export const getCountFlagViso = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$flagViso",
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Client.collection.aggregate(pipeline).toArray();
    console.log("🚀 ~ file: aggregateClientStats.js:152 ~ getCountFlagViso ~ result:", result)
    console.log("🚀 ~ countFlagViso ~ result:", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to execute the aggregation:", error);
    return res.status(500).json({ error: "Failed to execute the aggregation" });
  }
};


// Define the age ranges
const ageRanges = [
  { id: '0-20', minAge: 0, maxAge: 20 },
  { id: '21-30', minAge: 21, maxAge: 30 },
  { id: '31-40', minAge: 31, maxAge: 40 },
  { id: '41-50', minAge: 41, maxAge: 50}
  // Define more age ranges as needed
];

// Function to aggregate data by age ranges
export const getAggregateDataByAgeRanges = async (req, res) => {
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
          _id: null,
          ageCounts: { $push: "$ageCounts" },
          totalCount: { $first: "$totalCount" }
        }
      },
      {
        $project: {
          ageCounts: 1,
          totalCount: 1,
          _id: 0
        }
      }
    ];

    const result = await Client.collection.aggregate(pipeline).toArray();

    // Create an object to store age counts for each range
    const ageRangeCounts = ageRanges.reduce((acc, range) => {
      acc[range.id] = 0;
      return acc;
    }, {});

    // Count the clients in each age range
    result[0]?.ageCounts.forEach((age) => {
      for (const range of ageRanges) {
        if (age >= range.minAge && age <= range.maxAge) {
          ageRangeCounts[range.id]++;
          break;
        }
      }
    });

    // Format data for the pie chart
    const formattedData = Object.entries(ageRangeCounts).map(([label, value]) => ({
      label,
      value,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Failed to execute the aggregation:', error);
    return res.status(500).json({ error: 'Failed to execute the aggregation' });
  }
}