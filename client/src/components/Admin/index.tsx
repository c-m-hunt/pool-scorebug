import "./Admin.css";

import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useScorebugService } from "../../services/api";
import { validateGame } from "../../validation";
import {
	Config as IConfig,
	Game as IGame,
	Match as IMatch,
} from "./../../types";
import { Config } from "./Config";
import { Game } from "./Game";
import { Match } from "./Match";

export const Admin = () => {
	const {
		scorebug,
		saveScorebug: saveScorebugToService,
		loading,
	} = useScorebugService();
	const [scorebugState, setScorebugState] = useState(scorebug);
	const [games, setGames] = useState({} as { [key: string]: IGame });
	const [loaded, setLoaded] = useState(false);
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	const saveGame = (idx: string) => (game: IGame) => {
		if (scorebugState) {
			const updateGames = games ? { ...games } : {};
			updateGames[idx] = game;
			setGames(updateGames);
			setUnsavedChanges(true);
		}
	};

	const addGame = () => {
		if (scorebugState) {
			const updateGames = games ? { ...games } : {};
			updateGames[uuidv4()] = {
				homePlayer: "",
				awayPlayer: "",
				homeScore: 0,
				awayScore: 0,
				live: false,
			};
			setGames(updateGames);
		}
	};

	const deleteGame = (idx: string) => () => {
		if (scorebugState) {
			const updateGames = { ...games };
			delete updateGames[idx];
			setGames(updateGames);
			setUnsavedChanges(true);
		}
	};

	const setGameLive = (idx: string) => (live: boolean) => {
		if (scorebugState) {
			const updateGames = { ...games };
			for (const g in updateGames) {
				updateGames[g].live = false;
			}
			updateGames[idx].live = live;
			setGames(updateGames);
			setUnsavedChanges(true);
		}
	};

	const saveMatchDetails = (matchToSave: IMatch) => {
		if (scorebugState) {
			setScorebugState({ ...scorebugState, match: matchToSave });
		}
	};

	const saveConfig = (config: IConfig) => {
		if (scorebugState) {
			setScorebugState({ ...scorebugState, config: config });
			setUnsavedChanges(true);
		}
	};

	useEffect(() => {
		if (scorebug && !loaded) {
			console.debug("Scorebug loaded");
			setLoaded(true);
			setScorebugState(scorebug);

			if (scorebug.match.games) {
				const { games } = scorebug.match;
				const updateGames = {} as { [key: string]: IGame };
				for (let i = 0; i < games.length; i++) {
					updateGames[uuidv4()] = games[i];
				}
				setGames(updateGames);
			}
		}
	}, [loaded, scorebug]);

	useEffect(() => {
		if (unsavedChanges) {
			console.debug("Saving changes");
			const saveMatch = () => {
				if (scorebugState) {
					saveScorebugToService({
						...scorebugState,
						match: {
							...scorebugState.match,
							games: Object.values({ ...games }).filter(
								(g) => validateGame(g).length === 0,
							),
						},
					});
				}
				console.debug("Changes saved");
				setUnsavedChanges(false);
			};

			saveMatch();
		}
	}, [unsavedChanges, games, scorebugState, saveScorebugToService]);

	return (
		<div className="admin">
			<Card>
				<Card.Header>
					<Card.Title>
						<h1>Scorebug Admin</h1>{" "}
					</Card.Title>
				</Card.Header>
				<Card.Body>
					{scorebugState && !loading && (
						<>
							<Card>
								<Card.Header>
									<Card.Title>Config</Card.Title>
								</Card.Header>
								<Card.Body>
									<Config
										config={scorebugState.config}
										saveConfig={saveConfig}
									/>
								</Card.Body>
							</Card>
							<Card>
								<Card.Header>
									<Card.Title>Match details</Card.Title>
								</Card.Header>
								<Card.Body>
									<Match
										match={scorebugState.match}
										saveMatch={saveMatchDetails}
									/>
								</Card.Body>
							</Card>

							<Card>
								<Card.Header>
									<Card.Title>Games</Card.Title>
								</Card.Header>
								<Card.Body>
									{Object.entries(games).map(([id, game]) => {
										return (
											<Game
												game={game}
												key={id}
												saveGame={saveGame(id)}
												deleteGame={deleteGame(id)}
												setLive={setGameLive(id)}
											/>
										);
									})}

									<Button variant="primary" size="sm" onClick={addGame}>
										Add Game
									</Button>
								</Card.Body>
							</Card>
						</>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};
