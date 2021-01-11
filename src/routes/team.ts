import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { checkPlayerRequestBody } from "../middleware/checkRequestBody";
import { player } from "../controllers/player";

const router = express.Router();

router.post("/", checkSeason, checkPlayerRequestBody, player);

export default router;
