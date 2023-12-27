import { Config, Match } from "../types";

interface ScorebugProps {
	match: Match;
	config: Config;
}

export const Scorebug = (props: ScorebugProps) => {
	const { match, config } = props;
	const liveGames = match.games ? match.games.filter((game) => game.live) : [];
	const liveGame = liveGames.length > 0 ? liveGames[0] : null;
	const homeColorClass = liveGame?.homeColour
		? `home-color-${liveGame.homeColour}`
		: "";

	return (
		<div className="scorebug">
			{config.showTeamScore && (
				<div className="scorebug_match">
					<div className="scorebug_match_team">{props.match.homeTeam}</div>
					<div className="score">
						<div>{match.homeScore}</div>
						<div>{match.awayScore}</div>
					</div>
					<div className="scorebug_match_team">{props.match.awayTeam}</div>
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
