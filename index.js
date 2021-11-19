import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import weather from "./weather/index.js";
import rateLimit from "express-rate-limit";

// Date
const today = new Date().toISOString();

// Express
const app = express();
const port = 3001;

// Route Protection needs debugging and activation below
const whiteList = [
  "http://127.0.0.1:3000/weather",
  "http://127.0.0.1:3000",
  "http://localhost:3000/weather",
  "http://127.0.0.1:3001",
  "https://expspaceweather.com/weather",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
      console.log('normal callback');
    } else {
      callback(new Error("not allowed by CORS"));
      console.log('error');
    }
  },
  optionsSuccessStatus: 200
};

// End of buggy code

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});


app.use(limiter);
dotenv.config();

app.use(express.json());

app.use(cors());

// Active to disable non-cors from accessing. Needs debugging.
// app.use(cors(corsOptions));

// Test Route
app.get("/", (request, response) =>
  response.json({ success: `you are on main index` })
);

app.listen(port, () =>
  console.log(`evil hacks running on port ${port} on ${today}`)
);

app.use("/weather", weather);
