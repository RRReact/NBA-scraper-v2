import { RequestHandler } from "express";
import { PlayerRequest } from "../types/player";

export const player: RequestHandler = async (req, res, next) => {
    const { firstName, lastName }: PlayerRequest = req.body;
};
