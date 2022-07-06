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

// CORS
const allowList = [
  "http://127.0.0.1/",
  "http://localhost/",
  "http://localhost:3000",
  "https://www.expspaceweather.com/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
