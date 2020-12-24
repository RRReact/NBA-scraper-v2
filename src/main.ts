import express from "express";
import { connect as dbConnect } from "./db/db";
import { scrap } from "./scraper/scraper";
const app = express();
const main = async () => {
  await dbConnect();
  scrap();
};
main();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
