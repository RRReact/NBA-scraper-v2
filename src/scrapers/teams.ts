import axios from "axios";
import { TeamProfile } from "../models/TeamProfile";
import { Team } from "../types/team";

export const scrapTeams = async () => {
    const teams: Team[] = await fetchTeamsData();
    for (let team of teams) {
        saveTeam(team);
    }
};
const fetchTeamsData = async () => {
    const teamsData = "https://neulionms-a.akamaihd.net/nbad/player/v1/nba/site_spa/config.json";
    const nbaTeamsPartialData = [];
    const nbaTeams = [];

    const response = await axios.get(teamsData);
    const allTeammIds: string[] = response.data.TEAM_TVE_RESOURCE_IDS;
    const nbaIds = allTeammIds.map((id: string) => {
        return id.replace("NBATP-", "");
    });
    const unfilteredTeams: TeamRecord = response.data.teams;
    nbaIds.forEach((id: string) => {
        if (unfilteredTeams[id]) {
            nbaTeamsPartialData.push(unfilteredTeams[id]);
        }
    });
    for (let team of nbaTeamsPartialData) {
        const { city, name, conference, divison, code, id } = team;
        const year = new Date().getFullYear();
        const yearBefore = year - 1;
        const url = `https://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${yearBefore}-${year - 2000}&TeamID=${id}`;
        const response = await axios({ method: "get", url, headers: { Referer: "https://www.nba.com/", Accept: "*/*" } });
        console.log(`Downloading data for ${city} ${name} team`);
        const playerIds = response.data.resultSets[0].rowSet.map(player => player[0]);
        const coachingStaff = response.data.resultSets[1].rowSet.map(coach => {
            const position = coach[7];
            const firstName = coach[3];
            const lastName = coach[4];
            return { firstName, lastName, position };
        });
        const logo = `https://www.nba.com/stats/media/img/teams/logos/${code}_logo.svg`;
        nbaTeams.push({ city, name, conference, divison, logo, playerIds, coachingStaff });
    }
    return nbaTeams;
};
const saveTeam = (teamObject: Team) => {
    const team = new TeamProfile(teamObject);
    team.save();
};
interface TeamRecord {
    [T: string]: Team;
}
