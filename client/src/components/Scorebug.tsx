import { Scorebug as ScorebugProps } from "../types";

export const Scorebug = ({ match, config, games }: ScorebugProps) => {
	const liveGames = games ? games.filter((game) => game.live) : [];
	const liveGame = liveGames.length > 0 ? liveGames[0] : null;
	const homeColorClass = liveGame?.homeColour
		? `home-color-${liveGame.homeColour}`
		: "";

	return (
		<div className="scorebug">
			{config.showTeamScore && (
				<div className="scorebug_match">
					<div className="scorebug_match_team">{match.homeTeam}</div>
					<div className="score">
						<div>{match.homeScore}</div>
						<div>{match.awayScore}</div>
					</div>
					<div className="scorebug_match_team">{match.awayTeam}</div>
				</div>
			)}
			{liveGame && (
				<div className={`scorebug_game ${homeColorClass}`}>
					<div className="scorebug_game_player">{liveGame.homePlayer}</div>
					<div className="score">
						<div>{liveGame.homeScore}</div>
						<div>{liveGame.awayScore}</div>
					</div>
					<div className="scorebug_game_player">{liveGame.awayPlayer}</div>
				</div>
			)}
		</div>
	);
};
