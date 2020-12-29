import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import update from "./routes/update";
const app = express();
const port = 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zm1zd.mongodb.net/nba?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((result) => {
    console.log("connected to DB");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
//Routes
app.use("/update", update);
