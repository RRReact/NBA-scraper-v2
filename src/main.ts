import express from "express";
import { connect as dbConnect } from "./db/db";
import { scrap } from "./scraper/scraper";
const app = express();
dbConnect();
scrap();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
