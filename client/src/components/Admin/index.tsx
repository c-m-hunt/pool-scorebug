import { Button, Card } from 'react-bootstrap';
import { useScorebugService } from '../../services/api';
import { Match } from './Match';
import { Game } from './Game';
import { Config } from './Config';
import { Game as IGame, Match as IMatch, Config as IConfig } from './../../types';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const Admin = () => {
    const { scorebug, saveScorebug: saveScorebugToService, loading } = useScorebugService()
    const [ scorebugState, setScorebugState ] = useState(scorebug)
    const [ games, setGames ] = useState({} as { [key: string]: IGame })
    const [ loaded, setLoaded ] = useState(false);
    const [ unsavedChanges, setUnsavedChanges] = useState(false);

    const saveGame = (idx: string) => (game: IGame) => {
        if (scorebugState) {
            const updateGames  = games ? {...games} : {};
            updateGames[idx] = game;
            setGames(updateGames);
            setUnsavedChanges(true);
        }
    };
    
    const addGame = () => {
        if (scorebugState) {
            const updateGames  = games ? {...games} : {};
            updateGames[uuidv4()] = {
                homePlayer: '',
                awayPlayer: '',
                homeScore: 0,
                awayScore: 0,
                live: false,
            };
            setGames(updateGames);
            setUnsavedChanges(true);
        }
    };

    const deleteGame = (idx: string) => () => {
        if (scorebugState) {
            const updateGames  = {...games}
            delete updateGames[idx]
            setGames(updateGames)
            setUnsavedChanges(true);
        }
    }

    const setGameLive = (idx: string) => (live: boolean) => {
        if (scorebugState) {
            const updateGames  = {...games}
            Object.keys(updateGames).forEach(g => {
                updateGames[g].live = false;
            })
            updateGames[idx].live = live;
            setGames(updateGames)
            setUnsavedChanges(true);
        }
    }

    const saveMatchDetails = (matchToSave: IMatch) => {
        if (scorebugState) {
            setScorebugState({...scorebugState, match: matchToSave})
        }
    }

    const saveMatch = () => {
        if (scorebugState) {
            saveScorebugToService({
                ...scorebugState, 
                match: {
                    ...scorebugState.match,
                    games: Object.values(games)
                } 
            })
        }
        setUnsavedChanges(false);
    };

    const saveConfig = (config: IConfig) => {
        if (scorebugState) {
            setScorebugState({...scorebugState, config: config})
        }
    }

    useEffect(() => {
        if (scorebug && !loaded) {
            setLoaded(true)
            setScorebugState(scorebug)

            if (scorebug.match.games) {
                const { games } = scorebug.match;
                let updateGames = {} as { [key: string]: IGame }
                for (let i = 0; i < games.length; i++) {
                    updateGames[uuidv4()] = games[i];
                }
                setGames(updateGames);
            }

        }
    }, [scorebug])

    return (
        <div className="admin">
            <Card>
                <Card.Header>
                    <Card.Title>Match</Card.Title>
                </Card.Header>
                <Card.Body>
                {scorebugState && !loading && 
                    <>  
                        <h3>Config</h3>
                        <Config config={scorebugState.config} saveConfig={saveConfig} />
                        <h3>Match details</h3>
                        <Match match={scorebugState.match} saveMatch={saveMatchDetails} />
                        <Button variant="primary" size="sm" onClick={saveMatch}>Update match</Button>
                        <h3>Games</h3>
                        <Button variant="primary" size="sm" onClick={addGame}>Add Game</Button>
                        {Object.entries(games).map(([id, game]) => {
                            return <Game game={game} key={id} saveGame={saveGame(id)} deleteGame={deleteGame(id)} setLive={setGameLive(id)} /> 
                        })}
                    </>
                }
                </Card.Body>
            </Card>
        </div>
    );
}