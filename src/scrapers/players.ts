import axios from "axios";

import { CurrentPlayerProfile, HistoricalPlayerProfile } from "../models/PlayerProfile";

import { Player } from "../types/player";
import { currentHistorical } from "../types/season";

export const scrapPlayers = async (season: currentHistorical) => {
    return new Promise(async resolve => {
        const players = await fetchPlayersUrl(season);

        for (let player of players) {
            const playerObject = await fetchPlayerData(player, season);
            savePlayer(playerObject, season);
        }
        resolve(players);
    });
};
const fetchPlayersUrl = async (season: currentHistorical): Promise<Array<any[]>> => {
    const dataUrl = `https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=${
        season === "current" ? 0 : 1
    }&LeagueID=00&Season=2020-21&SeasonType=Regular%20Season&TeamID=0&Weight=`;
    const response = await axios({
        method: "GET",
        headers: { Referer: "https://www.nba.com/" },
        url: dataUrl,
    });

    const data: NbaApiResponseData = response.data;
    return data.resultSets[0].rowSet;
};
const fetchPlayerData = async (player: any[], season: currentHistorical): Promise<Player> => {
    const isActive = season === "current" ? true : false;
    const playerId = player[0];
    const lastName = player[1];
    const firstName = player[2];
    const playerImage = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/${playerId}.png`;
    const team = `${player[7]} ${player[8]} - ${player[9]}`;
    const height = player[12];
    const weight = player[13];
    const school = player[14];
    const country = player[15];
    const draft = player[16];
    const stats = {
        ppg: isActive ? player[22] : player[20],
        rpg: isActive ? player[23] : player[21],
        apg: isActive ? player[24] : player[22],
    };

    return {
        nbaId: playerId,
        firstName,
        lastName,
        team,
        weight,
        height,
        playerImage,
        country,
        school,
        draft,
        stats,
    };
};

const savePlayer = (playerObject: Player, season: currentHistorical) => {
    const player = season === "current" ? new CurrentPlayerProfile(playerObject) : new HistoricalPlayerProfile(playerObject);
    player.save();
};

interface NbaApiResponseData {
    parameters: {};
    resource: string;
    resultSets: [{ headers: []; name: string; rowSet: Array<any[]> }];
}
