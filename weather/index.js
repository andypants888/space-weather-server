import express from "express";

// const fetch = require("node-fetch");
import fetch from "node-fetch";

const router = express.Router();

const fetchSpaceWeather = async () => {
  // End Date == Today!
  // Testing Historical Weather Events

  // const testEndDate = "2021-7-17";
  // const testStartDate = "2021-6-5";
  // const testEndpoint = `https://api.nasa.gov/DONKI/notifications?startDate=${testStartDate}&endDate=${testEndDate}&type=all&api_key=${API_KEY}`;

  const today = new Date().toISOString();
  const endpoint = `https://api.nasa.gov/DONKI/notifications?startDate=YYYY-MM-DD&endDate=${today}&type=all&api_key=${process.env.SPACE_WEATHER_API_KEY}`;

  try {
    const weatherStream = await fetch(endpoint);
    const weatherJSON = await weatherStream.json();
    // console.log("testEndDate: ", testDate);
    return weatherJSON;
  } catch (err) {
    return { Error: err.stack };
  }
};

router.get("/", async (req, res) => {
  //   res.json({ success: `today: ${today}` });
  const data = await fetchSpaceWeather();

  // console.log(data);
  res.json(data);
});

export default router;
