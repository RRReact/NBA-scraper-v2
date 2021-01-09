import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";

export const checkSeason: RequestHandler = (req, res, next) => {
    const fail = "Wrong season, update 'historical' or 'current'!";
    const season = req.params.season as currentHistorical;

    if (season === "current" || season === "historical") {
        return next();
    } else {
        console.log(fail.replace("{season}", season));
        res.status(404).json({ message: fail });
    }
};
