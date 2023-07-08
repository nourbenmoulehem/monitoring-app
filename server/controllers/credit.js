import Credit from "../models/Credit.js";

export const getCredits = async (req, res) => {
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

    const credit = await Credit.find({
      $or: [
        { ncp: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Credit.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    
    const creditCountPromise = Credit.aggregate([
      {
        $group: {
          _id: "$etat_demande",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const [creditCountResult] = await Promise.all([creditCountPromise]);

    const valideCount = creditCountResult.find(entry => entry._id === "Validated")?.count || 0;
    const enCoursCount = creditCountResult.find(entry => entry._id === "In Progress")?.count || 0;
    const cancelledCount = creditCountResult.find(entry => entry._id === "Cancelled")?.count || 0;
    const missinInfoCount = creditCountResult.find(entry => entry._id === "Missing Information")?.count || 0;
    const inProgressCount = creditCountResult.find(entry => entry._id === "In Progress")?.count || 0;


    res.status(200).json({
      credit,
      total,
      valideCount,
      enCoursCount,
      cancelledCount,
      missinInfoCount,
      inProgressCount

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default getCredits;