import { RequestHandler } from "express";
import { PlayerRequest } from "../types/player";

export const checkPlayerRequestBody: RequestHandler = (req, res, next) => {
    const { firstName, lastName }: PlayerRequest = req.body;
    if (firstName && lastName) {
        return next();
    } else {
        res.status(400).json({ message: "Wrong body sent" });
    }
};
export const checkPlayerByIdRequestBody: RequestHandler = (req, res, next) => {
    const { id } = req.body;
    if (id && (typeof id === "string" || "array")) {
        return next();
    } else {
        res.status(400).json({ message: "Wrong body sent" });
    }
};
