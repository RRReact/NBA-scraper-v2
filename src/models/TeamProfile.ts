import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    logo: String,
    coachingStaff: Array,
    playerRoster: Array,
});
export const TeamProfile = mongoose.model("TeamProfile", schema);
