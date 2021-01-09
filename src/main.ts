import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import update from "./routes/update";
import players from "./routes/players";
import player from "./routes/player";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = process.env.BACKEND;

app.use(bodyParser.json());

app.use("/update", update);
app.use("/players", players);
app.use("/player", player);
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zm1zd.mongodb.net/nba?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
    )
    .then(result => {
        console.log("connected to DB");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err => console.log(err));
