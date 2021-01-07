import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { players } from "../controllers/players";

const router = express.Router();

router.get("/:season", checkSeason, players);

export default router;
