import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    logo: String,
    coaching_staff: Array,
    players_roster: Array,
});
export const TeamProfile = mongoose.model("TeamProfile", schema);
