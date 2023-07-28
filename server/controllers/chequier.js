import Chequier from "../models/Chequier.js";

export const getChequiers = async (req, res) => {
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

    const chequier = await Chequier.find({
      $or: [
        { ncp: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Chequier.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    
    const chequierCountPromise = Chequier.aggregate([
      {
        $group: {
          _id: "$etatDemande",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const [chequierCountResult] = await Promise.all([chequierCountPromise]);

    const valideCount = chequierCountResult.find(entry => entry._id === "validé")?.count || 0;
    console.log("🚀 ~ file: chequier.js:44 ~ getChequiers ~ valideCount:", valideCount)
    const enCoursCount = chequierCountResult.find(entry => entry._id === "en cours")?.count || 0;
    console.log("🚀 ~ file: chequier.js:45 ~ getChequiers ~ enCoursCount:", enCoursCount)


    res.status(200).json({
      chequier,
      total,
      valideCount,
      enCoursCount

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getChequierCountByEtat = async (req, res) => {
  try {
    const chequierCountPromise = Chequier.aggregate([
      {
        $group: {
          _id: "$etatDemande",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const chequierCountResult = await chequierCountPromise;

    // Transform the VirementCountResult array into the desired format
    const etatCounts = chequierCountResult.map((entry) => ({
      _id: entry._id,
      count: entry.count,
    }));

    res.status(200).json(etatCounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getMonthlyChequierCounts = async (req, res) => {
  try {
    // Fetch the virement data from the database
    const chequiers = await Chequier.find();

    // Group the Chequiers by month using the MongoDB aggregation pipeline
    const aggregatedData = await Chequier.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$dpe", // Group by the "dad" field (date of the virement)
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
    console.log("🚀 ~ file: chequier.js:113 ~ barChartData ~ barChartData:", barChartData)


    res.status(200).json(barChartData);
  } catch (error) {
    console.error("Error fetching virement data:", error);
    return [];
  }
};

// Helper function to format date as "MMM YYYY"
const formatDate = (date) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  return `${month}`;
};