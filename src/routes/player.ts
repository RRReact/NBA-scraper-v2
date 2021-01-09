import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { checkRequestBody } from "../middleware/checkRequestBody";
import { player } from "../controllers/player";

const router = express.Router();

router.post("/:season", checkSeason, checkRequestBody, player);

export default router;
