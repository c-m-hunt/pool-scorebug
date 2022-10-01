export interface MatchInterface {
    homeTeam: string;
    awayTeam: string;
    games: GameInterface[];
    score: () => [number, number];
    getLiveGame: () => GameInterface | null;
}

export interface GameInterface {
    homePlayer: string;
    awayPlayer: string;
    homeScore: number;
    awayScore: number;
    live: boolean;
}


export class Match implements MatchInterface {
    games: GameInterface[];

    constructor(public homeTeam: string, public awayTeam: string) {
        this.games = [];
    }

    score() {
        const score = this.games.reduce((acc, game) => {
            return [acc[0] + game.homeScore, acc[1] + game.awayScore];
        }, [0, 0]);
        return score as [number, number];
    }

    addGame(game: GameInterface) {
        this.games.push(game);
    }
    
    setLiveGame(idx: number) {
        this.games[idx].live = true;
    }

    getLiveGame() {
        const live = this.games.filter(game => game.live);
        if (live.length > 0) {
            return live[0];
        }
        return null;
    }
}