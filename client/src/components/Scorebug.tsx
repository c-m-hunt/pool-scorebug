import { Match } from '../types';

interface ScorebugProps {
    match: Match;
}

export const Scorebug = (props: ScorebugProps) => {
    const { match } = props;
    const game = match.games.filter((game) => game.live)[0];
    const homeColorClass = game.homeColour ? `home-color-${game.homeColour}` : '';

    return (
        <div className="scorebug">
            <div className="scorebug_match">
                <div className="scorebug_match_team">
                    {props.match.homeTeam}
                </div>
                <div className='score'>
                    <div>
                        {match.homeScore}
                    </div>
                    <div>
                        {match.awayScore}
                    </div>
                </div>
                <div className="scorebug_match_team">
                    {props.match.awayTeam}
                </div>
            </div>
            {game &&
            <div className={`scorebug_game ${homeColorClass}`}>
                <div className="scorebug_game_player">
                    {game.homePlayer}
                </div>
                <div className='score'>
                    <div>
                        {game.homeScore}
                    </div>
                    <div>
                        {game.awayScore}
                    </div>
                </div>
                <div className="scorebug_game_player">
                    {game.awayPlayer}
                </div>
            </div>            
            }
        </div>
    );
}