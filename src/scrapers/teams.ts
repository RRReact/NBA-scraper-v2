import axios from "axios";
import { TeamProfile } from "../models/TeamProfile";
import cheerio from "cheerio";

export const scrapTeams = async () => {
    const teams = await fetchTeamsUrl();
    for (let team of teams) {
        const teamObject = await fetchTeamData(team);
        // savePlayer(playerObject, season);
    }
};
const fetchTeamsUrl = async () => {
    const teamsIdsUrl = "https://neulionms-a.akamaihd.net/nbad/player/v1/nba/site_spa/config.json";
    const nbaTeams: TeamResponse[] = [];

    const response = await axios.get(teamsIdsUrl);
    const resourceIds: string[] = response.data.TEAM_TVE_RESOURCE_IDS;
    const ids = resourceIds.map((id: string) => {
        return id.replace("NBATP-", "");
    });
    const unfilteredTeams: TeamRecord = response.data.teams;
    ids.forEach((id: string) => {
        if (unfilteredTeams[id]) {
            nbaTeams.push(unfilteredTeams[id]);
        }
    });
    return nbaTeams;
};

const fetchTeamData = async (team: TeamResponse) => {};

interface TeamResponse {
    city: string;
    code: string;
    color: string;
    conference: string;
    divison: string;
    name: string;
}
interface TeamRecord {
    [T: string]: TeamResponse;
}
