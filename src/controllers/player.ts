import { RequestHandler } from "express";
import { PlayerRequest } from "../types/player";
import { CurrentPlayerProfile, HistoricalPlayerProfile } from "../models/PlayerProfile";

export const player: RequestHandler = async (req, res, next) => {
    const { firstName, lastName }: PlayerRequest = req.body;
    const season = req.params.season;
    if (season === "current") {
        const player = await CurrentPlayerProfile.findOne({ firstName, lastName });
        if (!player) {
            res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(player);
    }
};
