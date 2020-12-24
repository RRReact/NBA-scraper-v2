import { scrap } from "../scraper/scraper";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.post("/", (req, res) => {
  mongoose.connection.db.dropCollection("playerprofiles", () => {
    console.log("Players collection droppped");
    console.log("Downloadinng new collection:");
    scrap();
  });
});

export default router;
