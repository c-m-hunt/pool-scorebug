import { useState, useEffect } from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';
import { Game as IGame } from '../../types';

interface GameProps {
    game: IGame;
    saveGame: (game: IGame) => void;
}

export const Game = (props: GameProps) => {
    const { game } = props;
    
    const [values, setValues] = useState({
        homePlayer: game.homePlayer,
        awayPlayer: game.awayPlayer,
        homeScore: game.homeScore,
        awayScore: game.awayScore,
    });

    const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        props.saveGame({...props.game, ...values});
    }, [values, props]);

    return (
        <Form>
            <Row className="mb-3">
                <Col xs={4}>
                    <Form.Group as={Col} controlId="formHomePlayer">
                        <Form.Control type="text" placeholder="Home player" value={values.homePlayer} name="homePlayer" onChange={handlePlayerChange} />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group as={Col} controlId="formHomeScore">
                        <Form.Control type="number" placeholder="Home score" value={values.homeScore || 0} name="homeScore" onChange={handleScoreChange}/>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group as={Col} controlId="formAwayScore">
                        <Form.Control type="number" placeholder="Away score" value={values.awayScore || 0} name="awayScore" onChange={handleScoreChange}/>
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group as={Col} controlId="formAwayPlayer">
                        <Form.Control type="text" placeholder="Away player" value={values.awayPlayer} name="awayPlayer" onChange={handlePlayerChange}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={4}>
                    <Button variant="warning">Playing Yellow</Button>{' '}
                    <Button variant="danger">Playing Red</Button>
                </Col>
            </Row>
        </Form>
    );
}