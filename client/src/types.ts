export interface Match {
    homeTeam: string;
    awayTeam: string;
    games: Game[];
    homeScore: number;
    awayScore: number;
}

export interface Game {
    homePlayer: string;
    awayPlayer: string;
    homeScore: number;
    awayScore: number;
    homeColour?: "red" | "yellow";
    live: boolean;
}
