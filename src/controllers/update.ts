import mongoose from "mongoose";
import { RequestHandler } from "express";

import { scrap } from "../scrapers/scraper";

import { currentHistorical } from "../types/season";
import { Collection } from "../types/collections";

export const update: RequestHandler = (req, res) => {
    const success = "Downloading {season} collection success!";
    const season = req.params.season as currentHistorical;
    mongoose.connection.db.dropCollection(season === "current" ? Collection.CURRENT : Collection.HISTORICAL, async () => {
        try {
            console.log(`Players ${season} collection droppped!`);
            console.log(`Downloading new ${season} season collection!`);
            await scrap(season);
            console.log(success.replace("{season}", season));
            res.status(201).json({ message: success.replace("{season}", season) });
        } catch (error) {
            console.log("Error occured!");
            res.status(500).json(error);
        }
    });
};
