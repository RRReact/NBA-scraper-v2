import express from "express";
import updateBase from "../controllers/updateBase";
const router = express.Router();

router.put("/", updateBase);

export default router;
