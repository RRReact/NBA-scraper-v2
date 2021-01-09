import axios from "axios";
import { TeamProfile } from "../models/TeamProfile";
import cheerio from "cheerio";

export const scrapTeams = async () => {
    const players = await fetchTeamsUrl();
    // for (let player of players) {
    //     const playerObject = await fetchPlayerData(player, season);
    //     savePlayer(playerObject, season);
    // }
};
const fetchTeamsUrl = async () => {
    const teamsIdsUrl = "https://neulionms-a.akamaihd.net/nbad/player/v1/nba/site_spa/config.json";
    const response = await axios.get(teamsIdsUrl);
    const resourceIds = response.data.TEAM_TVE_RESOURCE_IDS;
    const processedIds = resourceIds.map((id: string) => {
        return id.replace("NBATP-", "");
    });
};
