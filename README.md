# Search-App

MongoDB Query
Ad.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "companies",
        },
      },
      {
        $unwind: "$companies",
      },
      {
        $match: {
          $or: [
            { "companies.name": { $regex: que, $options: "i" } },
            {
              primaryText: {
                $regex: que,
                $options: "i",
              },
            },
            {
              headline: { $regex: que, $options: "i" },
            },
            {
              description: {
                $regex: que,
                $options: "i",
              },
            },
          ],
        },
      },
    ])
