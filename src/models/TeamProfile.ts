import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    city: String,
    logo: String,
    conference: String,
    divison: String,
    coachingStaff: [Object],
    playerIds: [String],
});
export const TeamProfile = mongoose.model("TeamProfile", schema);
