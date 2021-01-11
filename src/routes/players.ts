import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { players, playersByIds } from "../controllers/players";
import { checkPlayerByIdRequestBody } from "../middleware/checkRequestBody";
const router = express.Router();

router.get("/:season", checkSeason, players);
router.post("/id/:season", checkSeason, checkPlayerByIdRequestBody, playersByIds);

export default router;
