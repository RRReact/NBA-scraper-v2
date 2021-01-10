import mongoose from "mongoose";
import { Team } from "../types/team";
const schema = new mongoose.Schema({
    name: String,
    city: String,
    logo: String,
    conference: String,
    divison: String,
    coachingStaff: [Object],
    playerIds: [String],
});
export const TeamProfile = mongoose.model<TeamDoc>("TeamProfile", schema);

interface TeamDoc extends mongoose.Document {
    name: string;
    city: string;
    conference: string;
    divison: string;
    logo: string;
    playerIds: string[];
    coachingStaff: { firstName: string; lastName: string; position: string }[];
}
