import mongoose from "mongoose";
import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";
import { CurrentPlayerProfile } from "../models/PlayerProfile";

export const players: RequestHandler = async (req, res, next) => {
    const season = req.params.season as currentHistorical;
    if (season === "current") {
        const players = await CurrentPlayerProfile.find({});
        res.status(200).json(players);
    }
};
