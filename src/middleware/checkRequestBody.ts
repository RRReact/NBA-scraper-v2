import { RequestHandler } from "express";
import { PlayerRequest } from "../types/player";

export const checkRequestBody: RequestHandler = (req, res, next) => {
    const { firstName, lastName }: PlayerRequest = req.body;
    if (firstName && lastName) {
        return next();
    } else {
        res.status(400).json({ message: "Wrong body sent" });
    }
};
