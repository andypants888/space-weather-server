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
import fetch from "node-fetch";
const router = express.Router();
const fetchSpaceWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    // End Date == Today!
    // Testing Historical Weather Events
    // const testEndDate = "2021-7-17";
    // const testStartDate = "2021-6-5";
    // const testEndpoint = `https://api.nasa.gov/DONKI/notifications?startDate=${testStartDate}&endDate=${testEndDate}&type=all&api_key=${API_KEY}`;
    const today = new Date().toISOString();
    const endpoint = `https://api.nasa.gov/DONKI/notifications?startDate=YYYY-MM-DD&endDate=${today}&type=all&api_key=${process.env.SPACE_WEATHER_API_KEY}`;
    try {
        const weatherStream = yield fetch(endpoint);
        const weatherJSON = yield weatherStream.json();
        // Simple Historical Test
        // console.log("testEndDate: ", testDate);
        return weatherJSON;
    }
    catch (err) {
        return { Error: err.stack };
    }
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchSpaceWeather();
    // Simple NASA Data Check
    // console.log(data);
    res.json(data);
}));
export default router;
