import { RequestHandler } from "express";

import { TeamProfile } from "../models/TeamProfile";
import { CurrentPlayerProfile } from "../models/PlayerProfile";
import { Team } from "../types/team";

export const teams: RequestHandler = async (req, res, next) => {
    const teams = await TeamProfile.find({});
    //     const playersIds = teams.
    // const teamPlayers = await team
    res.status(200).json(teams);
};
