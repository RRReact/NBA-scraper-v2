import mongoose from "mongoose";
import { scrap } from "../scraper/scraper";
import { RequestHandler } from "express";

const updateBase: RequestHandler = (req, res) => {
  mongoose.connection.db.dropCollection("playerprofiles", () => {
    console.log("Players collection droppped");
    console.log("Downloadinng new collection:");
    scrap();
  });
};
export default updateBase;
