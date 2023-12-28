import { useEffect, useRef, useState } from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { Game as IGame, PlayingColour } from "../../types";

interface GameProps {
	game: IGame;
	saveGame: (game: IGame) => void;
	deleteGame: () => void;
	setLive: (live: boolean) => void;
}

export const Game = ({ game, saveGame, deleteGame, setLive }: GameProps) => {
	const [values, setValues] = useState({ ...game });

	const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newGame = {
			...values,
			[name]: value,
		};
		setValues(newGame);
	};

	const handlePlayerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newGame = {
			...values,
			[name]: value,
		};
		setValues(newGame);
		saveGame(newGame);
	};

	const setHomeColour = (colour: PlayingColour | undefined = undefined) => {
		const newValues = { ...values };
		if (!colour) {
			newValues.homeColour = undefined;
			setValues(newValues);
		} else {
			newValues.homeColour = colour;
			setValues(newValues);
		}
		saveGame(newValues);
	};

	const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newGame = {
			...values,
			[name]: parseInt(value),
		};
		setValues(newGame);
		saveGame(newGame);
	};

	const awayColour = (homeColour: string | undefined) => {
		if (homeColour === undefined) {
			return "";
		}
		return homeColour === "red" ? "yellow" : "red";
	};

	return (
		<Form>
			<Row className="mb-3">
				<Col xs={4}>
					<Form.Group as={Col} controlId="formHomePlayer">
						<Form.Control
							type="text"
							placeholder="Home player"
							value={values.homePlayer}
							name="homePlayer"
							onChange={handlePlayerChange}
							onBlur={handlePlayerBlur}
						/>
					</Form.Group>
				</Col>
				<Col xs={2}>
					<Form.Group as={Col} controlId="formHomeScore">
						<Form.Control
							type="number"
							placeholder="Home score"
							value={values.homeScore || 0}
							name="homeScore"
							style={{ backgroundColor: values.homeColour }}
							onChange={handleScoreChange}
						/>
					</Form.Group>
				</Col>
				<Col xs={2}>
					<Form.Group as={Col} controlId="formAwayScore">
						<Form.Control
							type="number"
							placeholder="Away score"
							value={values.awayScore || 0}
							name="awayScore"
							style={{ backgroundColor: awayColour(values.homeColour) }}
							onChange={handleScoreChange}
						/>
					</Form.Group>
				</Col>
				<Col xs={4}>
					<Form.Group as={Col} controlId="formAwayPlayer">
						<Form.Control
							type="text"
							placeholder="Away player"
							value={values.awayPlayer}
							name="awayPlayer"
							onChange={handlePlayerChange}
							onBlur={handlePlayerBlur}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xs={4}>
					{!values.homeColour && (
						<>
							<Button variant="warning" onClick={() => setHomeColour("yellow")}>
								Playing Yellow
							</Button>{" "}
							<Button variant="danger" onClick={() => setHomeColour("red")}>
								Playing Red
							</Button>
						</>
					)}
					{values.homeColour && (
						<Button variant="default" onClick={() => setHomeColour()}>
							Remove Colour
						</Button>
					)}
				</Col>
			</Row>
			<Row className="mb-3">
				<Col xs={4}>
					{!game.live && (
						<Button variant="primary" onClick={() => setLive(true)}>
							Make Live
						</Button>
					)}
					{game.live && (
						<Button variant="primary" onClick={() => setLive(false)}>
							Remove Live
						</Button>
					)}{" "}
					<Button variant="danger" onClick={() => deleteGame()}>
						Delete
					</Button>
				</Col>
			</Row>
		</Form>
	);
};
