import mongoose from "mongoose";
import { scrap } from "../scraper/scraper";
import { RequestHandler } from "express";

const updateBase: RequestHandler = (req, res) => {
    const season = req.params.season as "current" | "historical";
    mongoose.connection.db.dropCollection("playerprofiles", async () => {
        try {
            console.log("Players collection droppped!");
            console.log("Downloading new collection:");
            await scrap(season);
            setTimeout(() => {
                console.log("\n", "Downloading collection ended!");
            }, 250);
            res.status(201).json({ message: "Updating collection success!" });
        } catch (error) {
            console.log("Error occured!");
            res.status(500).json(error);
        }
    });
};
export default updateBase;
