import "./Scoreboard.css";

import { Col, Container, Row } from "react-bootstrap";
import { Scorebug } from "../../types";
import { Game } from "./Game";
import { Match } from "./Match";

export const Scoreboard = ({ config, games, match }: Scorebug) => {
	return (
		<Container className="scoreboard">
			{config.description && (
				<Row>
					<Col className="text-center header">{config.description}</Col>
				</Row>
			)}
			<Match {...match} />
			{games.map((game) => (
				<Game {...game} />
			))}
		</Container>
	);
};
