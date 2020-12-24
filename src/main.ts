import { connect as dbConnect } from "./db/db";
import express from "express";
import update from "./routes/update";
const app = express();
const port = 3000;
//Routes
app.use("/update", update);
dbConnect();
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
