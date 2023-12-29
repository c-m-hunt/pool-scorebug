import { Game } from "../types";

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
