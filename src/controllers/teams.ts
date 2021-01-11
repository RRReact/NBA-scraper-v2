import { RequestHandler } from "express";

import { TeamProfile } from "../models/TeamProfile";
import { CurrentPlayerProfile } from "../models/PlayerProfile";

export const teams: RequestHandler = async (req, res, next) => {
    const teams = await TeamProfile.find({});
    res.status(200).json({ teams });
};
