import { Form, Row, Col } from 'react-bootstrap';
import { Game as IGame } from '../../types';

interface GameProps {
    game: IGame;
    saveGame: (game: IGame) => void;
}

export const Game = (props: GameProps) => {

    

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formHomePlayer">
                    <Form.Label>Home player</Form.Label>
                    <Form.Control type="text" placeholder="Enter home player" />
                </Form.Group>
                <Form.Group as={Col} controlId="formAwayPlayer">
                    <Form.Label>Away player</Form.Label>
                    <Form.Control type="text" placeholder="Enter away player" />
                </Form.Group>
                <Form.Group as={Col} controlId="formHomeScore">
                    <Form.Label>Home score</Form.Label>
                    <Form.Control type="number" placeholder="Enter home score" />
                </Form.Group>
                <Form.Group as={Col} controlId="formAwayScore">
                    <Form.Label>Away score</Form.Label>
                    <Form.Control type="number" placeholder="Enter away score" />
                </Form.Group>
            </Row>

        </Form>
    );
}