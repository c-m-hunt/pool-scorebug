import { Form } from 'react-bootstrap';
import { Game as IGame } from '../../types';

interface GameProps {
    game: IGame;
    saveGame: (game: IGame) => void;
}

export const Game = (props: GameProps) => {

    return (
        <Form>
            <Form.Group controlId="formHomePlayer">
                <Form.Label>Home player</Form.Label>
                <Form.Control type="text" placeholder="Enter home player" />
            </Form.Group>
            <Form.Group controlId="formAwayPlayer">
                <Form.Label>Away player</Form.Label>
                <Form.Control type="text" placeholder="Enter away player" />
            </Form.Group>
            <Form.Group controlId="formHomeScore">
                <Form.Label>Home score</Form.Label>
                <Form.Control type="number" placeholder="Enter home score" />
            </Form.Group>
            <Form.Group controlId="formAwayScore">
                <Form.Label>Away score</Form.Label>
                <Form.Control type="number" placeholder="Enter away score" />
            </Form.Group>
        </Form>
    );
}