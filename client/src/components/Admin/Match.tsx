import { useEffect, useState } from 'react';

import { Form, Row, Col } from 'react-bootstrap';
import { Match as IMatch } from './../../types';

interface MatchProps {
    match: IMatch;
    saveMatch: (match: IMatch) => void;
}

export const Match = (props: MatchProps) => {

    const [values, setValues] = useState({
        homeTeam: props.match.homeTeam,
        awayTeam: props.match.awayTeam,
        homeScore: props.match.homeScore,
        awayScore: props.match.awayScore,
    });

    const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: parseInt(value),
        });
    };

    useEffect(() => {
        props.saveMatch({...props.match, ...values});
    }, [values]);


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
                        <Form.Control type="number" placeholder="Home score" name="homeScore" value={values.homeScore} onChange={handleScoreChange} />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group controlId="formAwayScore">
                        <Form.Control type="number" placeholder="Away score" name="awayScore" value={values.awayScore} onChange={handleScoreChange} />
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