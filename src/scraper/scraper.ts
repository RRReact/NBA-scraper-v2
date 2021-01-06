import axios from "axios";
import cheerio from "cheerio";
import { CurrentPlayerProfile, HistoricalPlayerProfile } from "../models/PlayerProfile";
import cliProgress from "cli-progress";

import { Player } from "../types/player";
import { currentHistorical } from "../types/season";

export const scrap = async (season: currentHistorical) => {
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let currentPlayer = 1;
    const players = await getPlayersLinks(season);
    progressBar.start(players.length, 0);

    for (let player of players) {
        const playerObject = await fetchPlayerData(player);
        savePlayer(playerObject, season);
        progressBar.update(currentPlayer);
        currentPlayer++;
    }
};
const getPlayersLinks = async (season: currentHistorical): Promise<string[]> => {
    const dataLink = `https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=${
        season === "current" ? 0 : 1
    }&LeagueID=00&Season=2020-21&SeasonType=Regular%20Season&TeamID=0&Weight=`;

    const response = await axios({
        method: "GET",
        headers: { Referer: "https://www.nba.com/" },
        url: dataLink,
    });

    const data: NbaApiResponseData = response.data;
    const playersData = data.resultSets[0].rowSet;
    const playersLinks = playersData.map(playerData => {
        const playerId = playerData[0];
        const playerSlug = playerData[3];
        return `https://www.nba.com/player/${playerId}/${playerSlug}`;
    });
    return playersLinks;
};
const fetchPlayerData = async (player: string): Promise<Player> => {
    const response = await axios.get(player);
    const $ = cheerio.load(response.data);
    const name = $(".PlayerSummary_playerNameText__K7ZXO").toArray();
    const firstName = $(name[0]).text();
    const lastName = $(name[1]).text();
    const playerImage = $(".PlayerImage_image__1smob").attr("src");
    const playerDetails = $(".PlayerSummary_playerInfoValue__mSfou").toArray();
    const height = $(playerDetails[0]).text();
    const weight = $(playerDetails[1]).text();
    const country = $(playerDetails[2]).text();
    const school = $(playerDetails[3]).text();
    const age = $(playerDetails[4]).text();
    const birthDate = $(playerDetails[5]).text();
    const draft = $(playerDetails[6]).text();
    const experience = $(playerDetails[7]).text();
    const playerObject: Player = {
        firstName,
        lastName,
        playerImage,
        height,
        weight,
        country,
        school,
        age,
        birthDate,
        draft,
        experience,
    };
    return playerObject;
};
const savePlayer = (playerObject: Player, season: currentHistorical) => {
    if (season === "current") {
        const player = new CurrentPlayerProfile(playerObject);
        player.save();
    } else if (season === "historical") {
        const player = new HistoricalPlayerProfile(playerObject);
        player.save();
    } else {
        console.log("bad route");
    }
};

interface NbaApiResponseData {
    parameters: {};
    resource: string;
    resultSets: [{ headers: []; name: string; rowSet: [] }];
}
