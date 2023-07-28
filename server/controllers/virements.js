import Virement from "../models/Virement.js";

export const getVirements = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const virement = await Virement.find({
      $or: [
        { ncp: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Virement.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    
    const virementCountPromise = Virement.aggregate([
      {
        $group: {
          _id: "$etat",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const [virementCountResult] = await Promise.all([virementCountPromise]);
    console.log("🚀 ~ file: virements.js:42 ~ getVirements ~ virementCountResult:", virementCountResult)

    const valideCount = virementCountResult.find(entry => entry._id === "Validé")?.count || 0;
    const enCoursCount = virementCountResult.find(entry => entry._id === "En cours")?.count || 0;
    const cancelledCount = virementCountResult.find(entry => entry._id === "Annulé")?.count || 0;
    const missinInfoCount = virementCountResult.find(entry => entry._id === "Info manquantes")?.count || 0;


    res.status(200).json({
      virement,
      total,
      valideCount,
      enCoursCount,
      cancelledCount,
      missinInfoCount,

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVirementCountByEtat = async (req, res) => {
  try {
    const virementCountPromise = Virement.aggregate([
      {
        $group: {
          _id: "$etat",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const virementCountResult = await virementCountPromise;

    // Transform the VirementCountResult array into the desired format
    const etatCounts = virementCountResult.map((entry) => ({
      _id: entry._id,
      count: entry.count,
    }));

    res.status(200).json(etatCounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMonthlyTransactionCounts = async (req, res) => {
  try {
    // Fetch the virement data from the database
    const virements = await Virement.find();

    // Group the virements by month using the MongoDB aggregation pipeline
    const aggregatedData = await Virement.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$dad", // Group by the "dad" field (date of the virement)
            },
          },
          count: { $sum: 1 }, // Calculate the count of transactions in each group
        },
      },
      { $sort: { _id: 1 } }, // Sort the data by month in ascending order
    ]);

    // Format the data for the Bar Chart
    const barChartData = aggregatedData.map((entry) => ({
      month: formatDate(new Date(entry._id)), // Format the month as "Jan 2023" for display
      count: entry.count,
    }));
    console.log("🚀 ~ file: virements.js:115 ~ barChartData ~ barChartData:", barChartData);

    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching virement data:", error);
    return [];
  }
};

// Helper function to format date as "MMM YYYY"
const formatDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${month}`;
};