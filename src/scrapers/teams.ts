import axios from "axios";
import { TeamProfile } from "../models/TeamProfile";
import { Team } from "../types/team";
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
    const allTeammIds: string[] = response.data.TEAM_TVE_RESOURCE_IDS;
    const nbaIds = allTeammIds.map((id: string) => {
        return id.replace("NBATP-", "");
    });
    const unfilteredTeams: TeamRecord = response.data.teams;
    nbaIds.forEach((id: string) => {
        if (unfilteredTeams[id]) {
            nbaTeams.push(unfilteredTeams[id]);
        }
    });
    return nbaTeams;
};

const fetchTeamData = async (team: TeamResponse) => {
    const { id, name, city, conference, divison, code } = team;
    const teamUrl = `https://www.nba.com/stats/team/${id}/`;
    const response = await axios.get(teamUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const logo = `https://www.nba.com/stats/media/img/teams/logos/${code}_logo.svg`;
    const playerElements = $(".player > a").toArray();
    const playerIds = playerElements.map(playerElement =>
        $(playerElement)
            .find("a")
            .attr("href"),
    );
    return { name, city, conference, divison, logo, playerIds };
};

interface TeamResponse {
    city: string;
    code: string;
    color: string;
    conference: string;
    divison: string;
    name: string;
    id: string;
}
interface TeamRecord {
    [T: string]: TeamResponse;
}
