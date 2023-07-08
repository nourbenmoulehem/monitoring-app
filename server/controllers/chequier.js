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

export default getChequiers;