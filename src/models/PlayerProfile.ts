import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    team: String,
    playerImage: String,
    height: String,
    weight: String,
    country: String,
    school: String,
    birthDate: String,
    draft: String,
    stats: { ppg: Number, rpg: Number, apg: Number },
});
export const CurrentPlayerProfile = mongoose.model("CurrentPlayerProfile", schema);
export const HistoricalPlayerProfile = mongoose.model("HistoricalPlayerProfile", schema);
