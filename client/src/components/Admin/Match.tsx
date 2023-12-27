import { useEffect, useState } from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import { Match as IMatch } from './../../types';

interface MatchProps {
    match: IMatch;
    saveMatch: (match: IMatch) => void;
}

export const Match = (props: MatchProps) => {

    const { match, saveMatch } = props;

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
        }
        setValues(newMatch);
        saveMatch(newMatch);

    };

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newMatch = {
            ...values,
            [name]: parseInt(value),
        }
        setValues(newMatch);
        saveMatch(newMatch);
    };

    return (
        <Form>
            <Row className="mb-3">
                <Col xs={4}>
                    <Form.Group controlId="formHomeTeam">
                        <Form.Control type="text" placeholder="Home team" name="homeTeam" value={values.homeTeam} onChange={handleTeamChange} />
                    </Form.Group>  
                </Col>
                <Col xs={2}>
                    <Form.Group controlId="formHomeScore">
                        <Form.Control type="number" placeholder="Home score" name="homeScore" value={values.homeScore || 0} onChange={handleScoreChange} />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group controlId="formAwayScore">
                        <Form.Control type="number" placeholder="Away score" name="awayScore" value={values.awayScore || 0} onChange={handleScoreChange} />
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group controlId="formAwayTeam">
                        <Form.Control type="text" placeholder="Away team" name="awayTeam" value={values.awayTeam} onChange={handleTeamChange} />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}