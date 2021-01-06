import express from "express";
import updateBase from "../controllers/updateBase";
const router = express.Router();

router.put("/:season", updateBase);

export default router;
