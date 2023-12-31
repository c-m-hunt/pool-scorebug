import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Game as IGame } from "../../types";
import { Game } from "./Game";

interface GamesProps {
	games: IGame[];
	saveGames: (games: IGame[]) => void;
}

const newGame = {
	homePlayer: "",
	awayPlayer: "",
	homeScore: 0,
	awayScore: 0,
	live: false,
};

export const Games = ({ games: gamesIn, saveGames }: GamesProps) => {
	const [games, setGames] = useState<IGame[]>([]);
	const [addingGame, setAddingGame] = useState(false);

	const saveGame = (idx: number) => (game: IGame) => {
		const updateGames = [...games];
		if (game.live) {
			for (const g of updateGames) {
				g.live = false;
			}
		}
		updateGames[idx] = game;
		setGames(updateGames);
		saveGames(updateGames);
	};

	const cancelAddGame = () => {
		setAddingGame(false);
	};

	const saveAddGame = (newGame: IGame) => {
		const updateGames = [...games];
		if (newGame.live) {
			for (const g of updateGames) {
				g.live = false;
			}
		}
		updateGames.push(newGame);
		setGames(updateGames);
		saveGames(updateGames);
		setAddingGame(false);
	};

	const deleteGame = (idx: number) => () => {
		const updateGames = [...games];
		delete updateGames[idx];
		setGames(updateGames);
		saveGames(updateGames);
	};

	useEffect(() => {
		setGames(gamesIn);
		console.debug("Games changed", gamesIn);
	}, [gamesIn]);

	return (
		<>
			{games?.map((game, idx) => {
				return (
					<Game
						game={game}
						key={idx}
						saveGame={saveGame(idx)}
						deleteGame={deleteGame(idx)}
					/>
				);
			})}
			{addingGame && (
				<Game
					game={{ ...newGame }}
					newGame={true}
					saveGame={saveAddGame}
					deleteGame={cancelAddGame}
				/>
			)}

			{!addingGame && (
				<Button variant="primary" size="sm" onClick={() => setAddingGame(true)}>
					Add Game
				</Button>
			)}
		</>
	);
};
