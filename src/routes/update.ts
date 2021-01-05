import express from "express";
import updateBase from "../controllers/updateBase";
const router = express.Router();

router.post("/", updateBase);

export default router;
