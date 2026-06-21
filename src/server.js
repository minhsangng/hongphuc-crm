import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { childrens } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

/* HEALTHZ */
app.get("/api/healthz", (req, res) => {
  res.status(200).json({ success: true });
});

app.get("/api/get-all-childrens", async (req, res) => {
  const result = await db.select().from(childrens);
  res.json(result);
});

/* MESSAGE RUNNING */
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});