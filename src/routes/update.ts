import express from "express";
import { updateBase, checkSeason } from "../controllers/updateBase";
const router = express.Router();

router.put("/:season", checkSeason, updateBase);

export default router;
