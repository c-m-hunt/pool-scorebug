import { useState, useEffect } from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';
import { Game as IGame, PlayingColour } from '../../types';

interface GameProps {
    game: IGame;
    saveGame: (game: IGame) => void;
    deleteGame: () => void;
    setLive: (live: boolean) => void;
}

export const Game = (props: GameProps) => {
    const { game } = props;
    
    const [values, setValues] = useState({
        homePlayer: game.homePlayer,
        awayPlayer: game.awayPlayer,
        homeScore: game.homeScore,
        awayScore: game.awayScore,
        homeColour: game.homeColour,
    });

    const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newGame = {
            ...props.game,
            ...values,
            [name]: value,
        }
        setValues(newGame);
    };

    const setHomeColour = (colour: PlayingColour | undefined = undefined) => {
        if (!colour) {
            const newValues = {...values}
            delete newValues.homeColour
            setValues(newValues)
        } else {
            setValues({
                ...values,
                homeColour: colour
            });    
        }
        
    }

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newGame = {
            ...props.game,
            ...values,
            [name]: parseInt(value),
        }
        setValues(newGame);
    };

    useEffect(() => {
        const saveGame = {...props.game, ...values};
        if (!values.homeColour) {
            delete saveGame.homeColour;
        }
        props.saveGame(saveGame);
    }, [values]);

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
                    {!values.homeColour &&
                        <>
                        <Button variant="warning" onClick={() => setHomeColour("yellow")}>Playing Yellow</Button>{' '}
                        <Button variant="danger" onClick={() => setHomeColour("red")}>Playing Red</Button> 
                        </>               
                    }
                    {values.homeColour && <Button variant="default" onClick={() => setHomeColour()}>Remove Colour</Button>}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={4}>
                    {!props.game.live && <Button variant='primary' onClick={() => props.setLive(true)}>Make Live</Button>}
                    {props.game.live && <Button variant='primary' onClick={() => props.setLive(false)}>Remove Live</Button>}
                    {' '}<Button variant='danger' onClick={() => props.deleteGame()}>Delete</Button>
                </Col>
            </Row>
        </Form>
    );
}