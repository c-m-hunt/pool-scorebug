import { Col, Row } from "react-bootstrap";
import { Game as GameProps } from "../../types";

export const Game = (game: GameProps) => {
	return (
		<Row className={game.live ? "live" : ""}>
			<Col xs={4}>{game.homePlayer}</Col>
			<Col xs={2}>{game.homeScore}</Col>
			<Col xs={2}>{game.awayScore}</Col>
			<Col xs={4}>{game.awayPlayer}</Col>
		</Row>
	);
};
