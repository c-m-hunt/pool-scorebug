import { Button, Card } from 'react-bootstrap';
import { useMatchService } from '../../services/api';
import { Match } from './Match';
import { Game } from './Game';
import { Game as IGame } from './../../types';

export const Admin = () => {
    const { match, saveMatch: saveMatchToService, updateMatch, loading } = useMatchService()

    const saveGame = (idx: number) => (game: IGame) => {
        if (match && updateMatch) {
            const games = [...match.games];
            games[idx] = game;
            updateMatch({...match, games});
        }
    };
    
    const addGame = () => {
        if (match) {
            const games = match.games ? [...match.games] : [];
            games.push({
                homePlayer: '',
                awayPlayer: '',
                homeScore: 0,
                awayScore: 0,
                live: false,
            });
            console.log(games)
            updateMatch({...match, games});
        }
    };

    const saveMatch = () => {
        if (match) {
            saveMatchToService(match);
        }
    };

    return (
        <div className="admin">
            <Card>
                <Card.Header>
                    <Card.Title>Match</Card.Title>
                </Card.Header>
                <Card.Body>
                {match && !loading && 
                    <>  
                        <h3>Match details</h3>
                        <Match match={match} saveMatch={updateMatch} />
                        {match && <Button variant="primary" size="sm" onClick={saveMatch}>Update match</Button>}
                        <h3>Games</h3>
                        <Button variant="primary" size="sm" onClick={addGame}>Add Game</Button>
                        {match.games && match.games.map((game, id) => {
                            return <Game game={game} key={id} saveGame={saveGame(id)} /> 
                        })}
                    </>
                }
                </Card.Body>
            </Card>
        </div>
    );
}