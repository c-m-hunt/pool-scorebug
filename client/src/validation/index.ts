import { Game, Match } from "../types";

export const validateGame = (game: Game): string[] => {
	const errors: string[] = [];
	if (!game.homePlayer) {
		errors.push("Home player is required");
	}
	if (!game.awayPlayer) {
		errors.push("Away player is required");
	}
	if (game.homePlayer === game.awayPlayer) {
		errors.push("Home and away players cannot be the same");
	}
	if (game.homeScore < 0) {
		errors.push("Home score cannot be negative");
	}
	if (game.awayScore < 0) {
		errors.push("Away score cannot be negative");
	}
	return errors;
};

export const validateMatch = (match: Match): string[] => {
	const errors: string[] = [];
	if (!match.homeTeam) {
		errors.push("Home team is required");
	}
	if (!match.awayTeam) {
		errors.push("Away team is required");
	}
	if (match.homeTeam === match.awayTeam) {
		errors.push("Home and away teams cannot be the same");
	}
	if (match.homeScore < 0) {
		errors.push("Home score cannot be negative");
	}
	if (match.awayScore < 0) {
		errors.push("Away score cannot be negative");
	}

	return errors;
};
