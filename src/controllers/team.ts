import { RequestHandler } from "express";
import { TeamProfile } from "../models/TeamProfile";
export const team: RequestHandler = async (req, res, next) => {
    const { name, city } = req.body;
    const team = await TeamProfile.findOne({ name, city });
    if (!team) {
        res.status(404).json({ message: "Team not found" });
    } else {
        res.status(200).json(team);
    }
};
