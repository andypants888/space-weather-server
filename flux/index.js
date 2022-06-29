import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = "flux data incoming";
  res.json(data);
});

export default router;
