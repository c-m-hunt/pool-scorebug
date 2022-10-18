import { useMatchService } from '../../services/api';
import { Match } from './Match';

export const Admin = () => {
    const { match, saveMatch } = useMatchService()

    return (
        <div className="admin">
            <h2>Match admin</h2>
            <h3>Match details</h3>
            {match && saveMatch && <Match match={match} saveMatch={saveMatch} />}

            <h3>Games</h3>
        </div>
    );
}