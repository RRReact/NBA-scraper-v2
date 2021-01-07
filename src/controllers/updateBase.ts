import mongoose from "mongoose";
import { scrap } from "../scraper/scraper";

import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";
import { Collection } from "../types/collections";

const success = "Updating {season} collection success!";
const fail = "Wrong season update 'historical' or 'current'!";

export const checkSeason: RequestHandler = (req, res, next) => {
    const season = req.params.season as currentHistorical;
    if (season === "current" || season === "historical") {
        next();
    } else {
        console.log(fail.replace("{season}", season));
        res.status(404).json({ message: fail });
    }
};

export const updateBase: RequestHandler = (req, res) => {
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
