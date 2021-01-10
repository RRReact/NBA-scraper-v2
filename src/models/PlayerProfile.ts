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
export const CurrentPlayerProfile = mongoose.model<PlayerDoc>("CurrentPlayerProfile", schema);
export const HistoricalPlayerProfile = mongoose.model<PlayerDoc>("HistoricalPlayerProfile", schema);

interface PlayerDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    team: string;
    playerImage: string;
    height: string;
    weight: string;
    country: string;
    school: string;
    draft: string;
    stats: { ppg: number; rpg: number; apg: number };
}
