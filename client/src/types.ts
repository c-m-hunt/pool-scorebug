export interface Scorebug {
	match: Match;
	config: Config;
}

export interface Config {
	showTeamScore: boolean;
	showPlayerScore: boolean;
}

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
	homeColour?: PlayingColour;
	live: boolean;
}

export type PlayingColour = "red" | "yellow";
