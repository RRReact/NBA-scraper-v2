import express from "express";
import { teams } from "../controllers/teams";
const router = express.Router();

router.get("/", teams);

export default router;
