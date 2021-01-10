import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    city: String,
    logo: String,
    conference: String,
    divison: String,
    coachingStaff: [Object],
    playersIds: [String],
});
export const TeamProfile = mongoose.model<TeamDoc>("TeamProfile", schema);

interface TeamDoc extends mongoose.Document {
    name: string;
    city: string;
    conference: string;
    divison: string;
    logo: string;
    playersIds: string[];
    coachingStaff: { firstName: string; lastName: string; position: string }[];
}
