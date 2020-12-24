import express from "express";
import { connect } from "./db/db";
const app = express();
connect();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
