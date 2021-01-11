import express from "express";
import { checkTeamRequestBody } from "../middleware/checkRequestBody";
import { team } from "../controllers/team";

const router = express.Router();

router.post("/", checkTeamRequestBody, team);

export default router;
