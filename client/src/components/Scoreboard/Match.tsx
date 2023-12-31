import { Col, Row } from "react-bootstrap";
import { Match as MatchProps } from "../../types";

export const Match = (match: MatchProps) => {
	return (
		<Row className="match-title">
			<Col xs={4}>{match.homeTeam}</Col>
			<Col xs={2}>{match.homeScore}</Col>
			<Col xs={2}>{match.awayScore}</Col>
			<Col xs={4}>{match.awayTeam}</Col>
		</Row>
	);
};
