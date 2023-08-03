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
          _id: "$etat",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const [creditCountResult] = await Promise.all([creditCountPromise]);

    const valideCount = creditCountResult.find(entry => entry._id === "Validé")?.count || 0;
    const enCoursCount = creditCountResult.find(entry => entry._id === "En cours")?.count || 0;
    const cancelledCount = creditCountResult.find(entry => entry._id === "Annulé")?.count || 0;
    const missinInfoCount = creditCountResult.find(entry => entry._id === "Info manquantes")?.count || 0;
    const inProgressCount = creditCountResult.find(entry => entry._id === "En cours")?.count || 0;


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

export const getMontantCreditStats = async (req, res) => {
  try {
    const credits = await Credit.find();

    const ranges = {
      '0-5000': 0,
      '5001-10000': 0,
      '10001-20000': 0,
      '20001-50000': 0,
      '50001-100000': 0,
      '100001+': 0,
    };

    credits.forEach((credit) => {
      if (credit.montant <= 5000) {
        ranges['0-5000']++;
      } else if (credit.montant <= 10000) {
        ranges['5001-10000']++;
      } else if (credit.montant <= 20000) {
        ranges['10001-20000']++;
      } else if (credit.montant <= 50000) {
        ranges['20001-50000']++;
      } else if (credit.montant <= 100000) {
        ranges['50001-100000']++;
      } else {
        ranges['100001+']++;
      }
    });

    // Transform the ranges object into an array of objects
    const montantRanges = Object.entries(ranges).map(([range, count]) => ({
      _id: range,
      count,
    }));
    console.log("🚀 ~ file: credit.js:99 ~ montantRanges ~ montantRanges:", montantRanges)

    res.status(200).json(montantRanges);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCreditCountByEtat = async (req, res) => {
  try {
    const creditCountPromise = Credit.aggregate([
      {
        $group: {
          _id: "$etat",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const creditCountResult = await creditCountPromise;

    // Transform the creditCountResult array into the desired format
    const etatCounts = creditCountResult.map((entry) => ({
      _id: entry._id,
      count: entry.count,
    }));

    res.status(200).json(etatCounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCreditCountByType = async (req, res) => {
  try {
    const creditCountPromise = Credit.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]).exec();

    const creditCountResult = await creditCountPromise;

    // Transform the creditCountResult array into the desired format
    const typeCounts = creditCountResult.map((entry) => ({
      _id: entry._id,
      count: entry.count,
    }));

    res.status(200).json(typeCounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

