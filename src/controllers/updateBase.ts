import mongoose from "mongoose";
import { scrap } from "../scraper/scraper";

import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";
import { Collection } from "../types/collections";

export const checkSeason: RequestHandler = (req, res, next) => {
    const season = req.params.season as currentHistorical;
    if (season === "current" || season === "historical") {
        next();
    } else {
        res.status(404).json({ message: "Season not found" });
    }
};

export const updateBase: RequestHandler = (req, res) => {
    const season = req.params.season as currentHistorical;
    mongoose.connection.db.dropCollection(season === "current" ? Collection.CURRENT : Collection.HISTORICAL, async () => {
        try {
            console.log(`Players ${season} collection droppped!`);
            console.log(`Downloading new ${season} season collection:`);
            await scrap(season);
            setTimeout(() => {
                console.log("\n", "Downloading collection ended!");
            }, 250);
            res.status(201).json({ message: "Updating collection success!" });
        } catch (error) {
            console.log("\nError occured!");
            res.status(500).json(error);
        }
    });
};
