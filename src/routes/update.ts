import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { updatePlayers, updateTeams } from "../controllers/update";

const router = express.Router();

router.put("/players/:season", checkSeason, updatePlayers);
router.put("/teams", updateTeams);

export default router;
