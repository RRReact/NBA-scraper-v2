export interface Team {
    name: string;
    city: string;
    conference: string;
    divison: string;
    logo: string;
    playersIds: string[];
    coachingStaff: { firstName: string; lastName: string; position: string }[];
}
