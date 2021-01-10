export interface Player {
    nbaId: string;
    firstName: string;
    lastName: string;
    team: string;
    playerImage: string;
    height: string;
    weight: string;
    country: string;
    school: string;
    draft: string;
    stats: { ppg: number; rpg: number; apg: number };
}

export interface PlayerRequest {
    firstName: string;
    lastName: string;
}
