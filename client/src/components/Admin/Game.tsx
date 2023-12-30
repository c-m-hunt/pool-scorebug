import { useEffect, useState } from "react";

import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";
import { Game as IGame, PlayingColour } from "../../types";
import { validateGame } from "../../validation";

interface GameProps {
	game: IGame;
	saveGame: (game: IGame) => void;
	deleteGame: () => void;
	setLive: (live: boolean) => void;
}

export const Game = ({ game, saveGame, deleteGame, setLive }: GameProps) => {
	const [values, setValues] = useState({ ...game });
	const [errors, setErrors] = useState([] as string[]);

	console.debug("Rendering Game", game);

	const getNewGame = (
		event: React.ChangeEvent<HTMLInputElement>,
		valAsInt: boolean,
	): IGame => {
		const { name, value } = event.target;
		const newGame = {
			...values,
			[name]: valAsInt ? parseInt(value) : value,
		};
		setValues(newGame);
		return newGame;
	};

	const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		getNewGame(event, false);
	};

	const handlePlayerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const newGame = getNewGame(event, false);
		if (errors.length === 0) {
			saveGame(newGame);
		}
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

	const handleScoreBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const newGame = getNewGame(event, true);
		if (errors.length === 0) {
			saveGame(newGame);
		}
	};

	const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		getNewGame(event, true);
	};

	const awayColour = (homeColour: string | undefined) => {
		if (homeColour === undefined || homeColour === "") {
			return "";
		}
		return homeColour === "red" ? "yellow" : "red";
	};

	useEffect(() => {
		const errs = validateGame(values);
		setErrors(errs);
	}, [values]);

	return (
		<Card className={game.live ? "active-game" : ""}>
			<Card.Header>
				{!game.live && (
					<Button
						variant="primary"
						disabled={errors.length > 0}
						onClick={() => setLive(true)}
					>
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
			</Card.Header>
			<Card.Body>
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
									onBlur={handleScoreBlur}
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
									onBlur={handleScoreBlur}
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
								<ButtonGroup aria-label="Select colour">
									<Button
										variant="warning"
										onClick={() => setHomeColour("yellow")}
									>
										Playing Yellow
									</Button>{" "}
									<Button variant="danger" onClick={() => setHomeColour("red")}>
										Playing Red
									</Button>
								</ButtonGroup>
							)}
							{values.homeColour && (
								<Button variant="primary" onClick={() => setHomeColour()}>
									Remove Colour
								</Button>
							)}
						</Col>
					</Row>
					{errors.length > 0 && (
						<Row className="mb-3">
							<Col xs={4}>
								<ul>
									{errors.map((err) => (
										<li>{err}</li>
									))}
								</ul>
							</Col>
						</Row>
					)}
				</Form>
			</Card.Body>
		</Card>
	);
};
