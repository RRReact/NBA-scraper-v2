import axios from "axios";
import cheerio from "cheerio";

export const scrap = async () => {
  const playersLinks = getPlayersLinks();
};
const getPlayersLinks = async (): Promise<string[]> => {
  const dataLink =
    "https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=0&LeagueID=00&Season=2020-21&SeasonType=Regular%20Season&TeamID=0&Weight=";
  const response = await axios({
    method: "GET",
    headers: { Referer: "https://www.nba.com/" },
    url: dataLink,
  });

  const data: ResponseData = response.data;
  const playersData = data.resultSets[0].rowSet;
  const playersLinks = playersData.map((playerData) => {
    const playerId = playerData[0];
    const playerSlug = playerData[3];
    return `https://www.nba.com/player/${playerId}/${playerSlug}`;
  });
  return playersLinks;
};
interface ResponseData {
  parameters: {};
  resource: string;
  resultSets: [{ headers: []; name: string; rowSet: [] }];
}
