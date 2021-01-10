export interface Team {
    name: string;
    city: string;
    conference: string;
    divison: string;
    logo: string;
    playerIds: string[];
    coachingStaff: { firstName: string; lastName: string; position: string }[];
}
