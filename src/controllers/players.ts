import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";
import { CurrentPlayerProfile, HistoricalPlayerProfile } from "../models/PlayerProfile";

export const players: RequestHandler = async (req, res, next) => {
    const season = req.params.season as currentHistorical;
    const players = season === "current" ? await CurrentPlayerProfile.find({}) : await HistoricalPlayerProfile.find({});
    res.status(200).json(players);
};
export const playersByIds: RequestHandler = async (req, res, next) => {
    const season = req.params.season as currentHistorical;
    const playersArray: string[] = req.body.id;
    const playerData =
        season === "current"
            ? await CurrentPlayerProfile.find({ nbaId: { $in: playersArray } })
            : await HistoricalPlayerProfile.find({ nbaId: { $in: playersArray } });

    res.status(200).json(playerData);
};
