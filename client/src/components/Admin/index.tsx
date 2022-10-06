import Form from 'react-bootstrap/Form';
import { useMatchService } from '../../services/api';
import { Match } from './Match';

export const Admin = () => {
    const match = useMatchService()

    return (
        <div className="admin">
            <h2>Match admin</h2>
            <h3>Match details</h3>
            {match.match && <Match match={match.match} />}

            <h3>Games</h3>
        </div>
    );
}