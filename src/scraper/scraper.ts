import axios from "axios";
import cheerio from "cheerio";
import PlayerProfile from "../models/PlayerProfile";

export const scrap = async () => {
  const players = await getPlayersLinks();
  for (let player of players.slice(0, 1)) {
    const playerObject = await fetchPlayerData(player);
    savePlayer(playerObject);
  }
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
const fetchPlayerData = async (player: string): Promise<Player> => {
  const html = await axios.get(player);
  const $ = cheerio.load(html.data);
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
const savePlayer = (playerObject: Player) => {
  const player = new PlayerProfile(playerObject);
  player.save();
};

interface ResponseData {
  parameters: {};
  resource: string;
  resultSets: [{ headers: []; name: string; rowSet: [] }];
}
interface Player {
  firstName: string;
  lastName: string;
  playerImage: string;
  height: string;
  weight: string;
  country: string;
  school: string;
  age: string;
  birthDate: string;
  draft: string;
  experience: string;
}
