import mongoose from "mongoose";
import { RequestHandler } from "express";
import { currentHistorical } from "../types/season";

export const players: RequestHandler = (req, res, next) => {
    const season = req.params.season as currentHistorical;
};
