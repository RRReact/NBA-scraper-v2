import express from "express";
import { checkSeason } from "../middleware/checkSeason";
import { update } from "../controllers/update";

const router = express.Router();

router.put("/:season", checkSeason, update);

export default router;
