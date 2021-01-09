import mongoose from "mongoose";
import { RequestHandler } from "express";

import { scrapPlayers } from "../scrapers/players";

import { currentHistorical } from "../types/season";
import { Collection } from "../types/collections";

//@update/
export const updatePlayers: RequestHandler = async (req, res) => {
    const success = "Downloading {season} collection success!";
    const season = req.params.season as currentHistorical;
    await mongoose.connection.db.dropCollection(season === "current" ? Collection.CURRENT : Collection.HISTORICAL);
    try {
        console.log(`Players ${season} collection droppped!`);
        console.log(`Downloading new ${season} season collection!`);
        await scrapPlayers(season);
        console.log(success.replace("{season}", season));
        res.status(201).json({ message: success.replace("{season}", season) });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
export const updateTeams: RequestHandler = async (req, res) => {
    try {
        await mongoose.connection.db.dropCollection(Collection.TEAMS);
        console.log("Teams collection dropped!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
