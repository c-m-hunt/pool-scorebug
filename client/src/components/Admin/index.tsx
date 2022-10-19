import { useMatchService } from '../../services/api';
import { Match } from './Match';
import { Game } from './Game';
import { Game as IGame } from './../../types';

export const Admin = () => {
    const { match, saveMatch } = useMatchService()
    const saveGame = (idx: number) => (game: IGame) => {
        if (match && saveMatch) {
            const games = [...match.games];
            games[idx] = game;
            saveMatch({...match, games});
        }
    };

    return (
        <div className="admin">
            <h2>Match admin</h2>
            {match && saveMatch && 
                <>
                    <h3>Match details</h3>
                    <Match match={match} saveMatch={saveMatch} />
                    <h3>Games</h3>
                    {match.games.map((game, id) => {
                        return <Game game={game} key={id} saveGame={saveGame(id)} /> 
                    })}
                </>
            }
        </div>
    );
}