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
          _id: "$etatVirement",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const [virementCountResult] = await Promise.all([virementCountPromise]);

    const valideCount = virementCountResult.find(entry => entry._id === "Executed")?.count || 0;
    const enCoursCount = virementCountResult.find(entry => entry._id === "In Progress")?.count || 0;
    const rejectedCount = virementCountResult.find(entry => entry._id === "Rejected")?.count || 0;
    const generatedCount = virementCountResult.find(entry => entry._id === "Generated")?.count || 0;



    res.status(200).json({
      virement,
      total,
      valideCount,
      enCoursCount,
      rejectedCount,
      generatedCount,

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default getVirements;