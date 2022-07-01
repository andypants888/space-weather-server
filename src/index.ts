import "dotenv/config";
import express from "express";
import weather from "./weather/index.js";
import flux from "./flux/index.js";
import rateLimit from "express-rate-limit";
import cors from "cors";

// Date
const today = new Date().toISOString();

// Express
const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

// cors
app.use(cors());
//initiate
app.use(limiter);
app.use(express.json());

// Test Route
app.get("/", (request, response) =>
  response.json({ success: `this humble server is functional` })
);

app.listen(PORT, () =>
  console.log(
    `space weather being served from localhost ${PORT} \n ISO TODAY: ${today}`
  )
);

app.use("/weather", weather);
app.use("/flux", flux);
