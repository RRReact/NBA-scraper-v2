import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { checkRequestBody } from "../middleware/checkRequestBody";
import { player, playerById } from "../controllers/player";

const router = express.Router();

router.get("/id/:season/:id", playerById);
router.post("/:season", checkSeason, checkRequestBody, player);

export default router;
