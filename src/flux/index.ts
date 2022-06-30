import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
const router = express.Router();

async function main() {
  const uri = `mongodb+srv://spaceweather:${process.env.MONGO_PASSWORD}@cluster0.ya4xd.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
  });
  let results;
  try {
    await client.connect();
    const cursor = client
      .db("spaceWeather")
      .collection("NOAA")
      .find({
        scrape_time: { $lte: new Date() },
      })
      .sort({ scrape_time: -1 })
      .limit(1);

    results = await cursor.toArray();
    await listDatabases(client);
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

router.get("/", async (req, res) => {
  const testString = "flux data incoming";
  const data = await main().catch(console.error);
  // MongoDB Data Check
  // console.log("data\n", data);
  res.json(data);
});

export default router;
