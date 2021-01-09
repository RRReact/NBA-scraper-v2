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
    const url = "https://www.nba.com/stats/teams/";
    const response = await axios.get(url);
    const html = response.data;
    console.log(html);

    const $ = cheerio.load(html);
    const teamsUrls = $(".stats-team-list__link").toArray();
    console.log(teamsUrls);
};
