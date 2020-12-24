import express from "express";
import { connect as dbConnect } from "./db/db";
import { scrap } from "./scraper/scraper";
const app = express();
const main = async () => {
  dbConnect();
  console.log("Downloading players data:");
  setTimeout(() => {
    scrap();
  }, 2000);
};
main();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
