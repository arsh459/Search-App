# Search-App

Functionality:

1. For Everykey stroke in search bar Api call will be made to server running on 8080 port with input as query.
2. Then Response will be shown on screen using CARD component.
3. **Input.jsx** Component is carrying all the functionalities related to Fetching.
4. **Server.js** is used for running the server

MongoDB Query

```
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
```

Routes

```
app.get("/api/", async (req, res) => {
  try {
    const { que = "" } = req.query
    const data = await Ad.aggregate([
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
    return res.send({ data: data })
  } catch (err) {
    return res.send({ message: err.message })
  }
})

```

fetch Function

```
async function fetchQueryData(query) {
    let response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}?que=${query}`
    )
    let data = await response.json()
    setState(data.data)
    console.log(data.data)
  }
```

# Screenshots

**Default page**

![Default Results](./images/React%20App%20-%20Google%20Chrome%2021_04_2023%2020_32_43.png)

**Search_1:-** Searching for "lev"

![Search_1](./images/React%20App%20-%20Google%20Chrome%2021_04_2023%2020_33_01.png)

**Search_2:-** Searching for "levi's"

![Search_2](./images/React%20App%20-%20Google%20Chrome%2021_04_2023%2020_33_16.png)

**Search_3:-** Searching for anything random

![Search_3](./images/React%20App%20-%20Google%20Chrome%2021_04_2023%2020_33_38.png)
