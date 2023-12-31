export interface Scorebug {
	match: Match;
	games: Game[];
	config: Config;
}

export interface Config {
	showTeamScore: boolean;
	showPlayerScore: boolean;
}

export interface Match {
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;
}

export interface Game {
	id?: string;
	homePlayer: string;
	awayPlayer: string;
	homeScore: number;
	awayScore: number;
	homeColour?: PlayingColour;
	live: boolean;
}

export type PlayingColour = "red" | "yellow";
