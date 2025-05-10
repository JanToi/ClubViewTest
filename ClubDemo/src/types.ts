

export interface Team {
    id: number;
    name: string;
    sport: string;
    membersCount: number;
    logoUrl?: string;
}

export interface Club {
    id: number;
    name: string;
    location: string;
    teams: Team[];
    logoUrl?: string;
}