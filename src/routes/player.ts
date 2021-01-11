import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { checkPlayerRequestBody, checkPlayerByIdRequestBody } from "../middleware/checkRequestBody";
import { player, playerById } from "../controllers/player";

const router = express.Router();

router.post("/id/:season", checkSeason, checkPlayerByIdRequestBody, playerById);
router.post("/:season", checkSeason, checkPlayerRequestBody, player);

export default router;
