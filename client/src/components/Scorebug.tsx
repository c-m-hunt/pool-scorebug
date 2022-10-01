import { MatchInterface } from '../types';

interface ScorebugProps {
    match: MatchInterface;
}

export const Scorebug = (props: ScorebugProps) => {
    const matchScore = props.match.score();
    const game = props.match.getLiveGame();
    return (
        <div className="scorebug">
            <div className="scorebug_match">
                <div className="scorebug_match_team">
                    {props.match.homeTeam}
                </div>
                <div className='score'>
                    <div>
                        {matchScore[0]}
                    </div>
                    <div>
                        {matchScore[1]}
                    </div>
                </div>
                <div className="scorebug_match_team">
                    {props.match.awayTeam}
                </div>
            </div>
            {game &&
            <div className="scorebug_game">
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