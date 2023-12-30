import { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import { validateMatch } from "../../validation";
import { Match as IMatch } from "./../../types";

interface MatchProps {
	match: IMatch;
	saveMatch: (match: IMatch) => void;
}

export const Match = (props: MatchProps) => {
	const { match, saveMatch } = props;
	const [errors, setErrors] = useState([] as string[]);

	const [values, setValues] = useState({
		homeTeam: match.homeTeam,
		awayTeam: match.awayTeam,
		homeScore: match.homeScore,
		awayScore: match.awayScore,
	} as IMatch);

	const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newMatch = {
			...values,
			[name]: value,
		};
		setValues(newMatch);
	};

	const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newMatch = {
			...values,
			[name]: parseInt(value),
		};
		setValues(newMatch);
	};

	useEffect(() => {
		const errors = validateMatch(values);
		setErrors(errors);
		if (errors.length === 0) {
			saveMatch(values);
		}
	}, [values, saveMatch]);

	return (
		<Form>
			<Row className="mb-3">
				<Col xs={4}>
					<Form.Group controlId="formHomeTeam">
						<Form.Control
							type="text"
							placeholder="Home team"
							name="homeTeam"
							value={values.homeTeam}
							onChange={handleTeamChange}
						/>
					</Form.Group>
				</Col>
				<Col xs={2}>
					<Form.Group controlId="formHomeScore">
						<Form.Control
							type="number"
							placeholder="Home score"
							name="homeScore"
							value={values.homeScore || 0}
							onChange={handleScoreChange}
						/>
					</Form.Group>
				</Col>
				<Col xs={2}>
					<Form.Group controlId="formAwayScore">
						<Form.Control
							type="number"
							placeholder="Away score"
							name="awayScore"
							value={values.awayScore || 0}
							onChange={handleScoreChange}
						/>
					</Form.Group>
				</Col>
				<Col xs={4}>
					<Form.Group controlId="formAwayTeam">
						<Form.Control
							type="text"
							placeholder="Away team"
							name="awayTeam"
							value={values.awayTeam}
							onChange={handleTeamChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			{errors.length > 0 && (
				<Row className="mb-3">
					<Col xs={12}>
						<ul>
							{errors.map((error) => (
								<li>{error}</li>
							))}
						</ul>
					</Col>
				</Row>
			)}
		</Form>
	);
};
