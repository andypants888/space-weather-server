var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
const router = express.Router();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = `mongodb+srv://spaceweather:${process.env.MONGO_PASSWORD}@cluster0.ya4xd.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, {
            serverApi: ServerApiVersion.v1,
        });
        let results;
        try {
            yield client.connect();
            const cursor = client
                .db("spaceWeather")
                .collection("NOAA")
                .find({
                scrape_time: { $lte: new Date() },
            })
                .sort({ scrape_time: -1 })
                .limit(1);
            results = yield cursor.toArray();
            yield listDatabases(client);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            yield client.close();
        }
        return results;
    });
}
function listDatabases(client) {
    return __awaiter(this, void 0, void 0, function* () {
        let databasesList = yield client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    });
}
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testString = "flux data incoming";
    const data = yield main().catch(console.error);
    // MongoDB Data Check
    // console.log("data\n", data);
    res.json(data);
}));
export default router;
