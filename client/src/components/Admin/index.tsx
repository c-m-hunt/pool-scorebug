import "./Admin.css";

import { useEffect, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useScorebugService } from "../../services/api";
import { validateGame, validateScorebug } from "../../validation";
import {
	Config as IConfig,
	Game as IGame,
	Match as IMatch,
} from "./../../types";
import { Config } from "./Config";
import { Games } from "./Games";
import { Match } from "./Match";

export const Admin = () => {
	const {
		scorebug,
		saveScorebug: saveScorebugToService,
		resetScorebug,
		loading,
	} = useScorebugService();
	const [scorebugState, setScorebugState] = useState(scorebug);
	const [games, setGames] = useState<IGame[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const [unsavedChanges, setUnsavedChanges] = useState(false);

	const saveGames = (gamesToSave: IGame[]) => {
		if (scorebugState) {
			console.debug("Saving games", gamesToSave);
			setScorebugState({
				...scorebugState,
				games: gamesToSave.filter((g) => validateGame(g).length === 0),
			});
			setUnsavedChanges(true);
		}
	};

	const saveMatchDetails = (matchToSave: IMatch) => {
		if (scorebugState) {
			console.log("Saving match details", matchToSave);
			setScorebugState({ ...scorebugState, match: matchToSave });
			setUnsavedChanges(true);
		}
	};

	const saveConfig = (config: IConfig) => {
		if (scorebugState) {
			console.debug("Saving config", config);
			setScorebugState({ ...scorebugState, config: config });
			setUnsavedChanges(true);
		}
	};

	useEffect(() => {
		console.debug("Scorebug changed", scorebug, loaded);
		if (scorebug) {
			console.debug("Scorebug loaded");
			setLoaded(true);
			setScorebugState(scorebug);
			setGames(scorebug.games || []);
		}
	}, [loaded, scorebug]);

	useEffect(() => {
		if (unsavedChanges) {
			console.debug("Saving changes");
			const saveMatch = () => {
				if (scorebugState) {
					console.debug("Saving state", scorebugState);
					if (validateScorebug(scorebugState).length === 0) {
						console.debug("Saving scorebug");
						saveScorebugToService(scorebugState);
					} else {
						console.debug("Scorebug invalid");
					}
				}
				console.debug("Changes saved");
				setUnsavedChanges(false);
			};

			saveMatch();
		}
	}, [unsavedChanges, scorebugState, saveScorebugToService]);

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
									<Games games={games} saveGames={saveGames} />
								</Card.Body>
							</Card>
						</>
					)}
					{!isResetting && (
						<Button
							onClick={() => {
								setIsResetting(true);
							}}
						>
							Reset
						</Button>
					)}
					{isResetting && (
						<ButtonGroup>
							<Button
								variant="danger"
								onClick={() => {
									resetScorebug();
									setIsResetting(false);
								}}
							>
								Continue reset
							</Button>
							<Button variant="secondary" onClick={() => setIsResetting(false)}>
								Cancel
							</Button>
						</ButtonGroup>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};
