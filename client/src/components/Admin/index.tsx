import { Button, Card } from 'react-bootstrap';
import { useMatchService } from '../../services/api';
import { Match } from './Match';
import { Game } from './Game';
import { Game as IGame, Match as IMatch } from './../../types';
import { useEffect, useState } from 'react';

export const Admin = () => {
    const { match, saveMatch: saveMatchToService, loading } = useMatchService()
    const [ matchState, setMatchState ] = useState(match)
    const [ loaded, setLoaded ] = useState(false);
    const [ unsavedChanges, setUnsavedChanges] = useState(false);

    const saveGame = (idx: number) => (game: IGame) => {
        if (match) {
            let games = [...match.games];
            games[idx] = game;
            setMatchState({...match, games});
            setUnsavedChanges(true);
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
            setMatchState({...match, games});
            setUnsavedChanges(true);
        }
    };

    const deleteGame = (idx: number) => () => {
        if (match) {
            const games = [...match.games];
            games.splice(idx, 1);
            setMatchState({...match, games});
            setUnsavedChanges(true);
        }
    }

    const setGameLive = (idx: number) => (live: boolean) => {
        if (match) {
            let games = [...match.games];
            games = games.map(g => {
                g.live = false;
                return g
            })
            games[idx].live = live;
            setMatchState({...match, games});
            setUnsavedChanges(true);
        }
    }

    const saveMatchDetails = (matchToSave: IMatch) => {
        setMatchState({...match, ...matchToSave})
    }

    const saveMatch = () => {
        if (matchState) {
            saveMatchToService({...match, ...matchState});
        }
        setUnsavedChanges(false);
    };

    useEffect(() => {
        if (match && !loaded) {
            setLoaded(true)
            setMatchState(match)
        }
    }, [match])

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
                        <Match match={match} saveMatch={saveMatchDetails} />
                        {match && <Button variant="primary" size="sm" onClick={saveMatch}>Update match</Button>}
                        {unsavedChanges && <p>Unsaved changes</p>}
                        <h3>Games</h3>
                        <Button variant="primary" size="sm" onClick={addGame}>Add Game</Button>
                        {matchState && matchState.games && matchState.games.map((game, id) => {
                            return <Game game={game} key={id} saveGame={saveGame(id)} deleteGame={deleteGame(id)} setLive={setGameLive(id)} /> 
                        })}
                    </>
                }
                </Card.Body>
            </Card>
        </div>
    );
}