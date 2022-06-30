import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
const router = express.Router();

// const { MongoClient, ServerApiVersion } = require("mongodb");
async function main() {
  const uri = `mongodb+srv://spaceweather:${process.env.MONGO_PASSWORD}@cluster0.ya4xd.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  let results;
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const cursor = client
      .db("spaceWeather")
      .collection("NOAA")
      .find({
        scrape_time: { $lte: new Date() },
        // radio_flux: { $gte: 102 },
      })
      .sort({ scrape_time: -1 })
      .limit(4);
    // .find({ scrape_time: new Date("2022-01-26T07:01:20.276+00:00") });

    results = await cursor.toArray();
    // console.log(results);

    // await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return results;
}

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
// main().catch(console.error);
router.get("/", async (req, res) => {
  const testString = "flux data incoming";
  const data = await main().catch(console.error);
  // res.json(data);
  console.log("data\n", data);
  res.json(data);
});

export default router;
