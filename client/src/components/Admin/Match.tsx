import Form from 'react-bootstrap/Form';
import { Match as IMatch } from './../../types';

interface MatchProps {
    match: IMatch;
}

export const Match = (props: MatchProps) => {
    return (
        <Form>
            <Form.Group controlId="formHomeTeam">
                <Form.Label>Home team</Form.Label>
                <Form.Control type="text" placeholder="Enter home team" />
            </Form.Group>
            <Form.Group controlId="formAwayTeam">
                <Form.Label>Away team</Form.Label>
                <Form.Control type="text" placeholder="Enter away team" />
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