import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Match } from './types';
import { Scorebug } from './components/Scorebug';

test('renders test match', () => {
  const matchTest: Match = {
    homeTeam: 'Home Team',
    awayTeam: 'Away Team',
    homeScore: 0,
    awayScore: 0,
    games: [
      {
        homePlayer: 'Home Player',
        awayPlayer: 'Away Player',
        homeScore: 0,
        awayScore: 0,
        live: true,
      },
    ],
  }


  render(<Scorebug match={matchTest} />);
  const linkElement = screen.getByText(/Home Team/i);
  expect(linkElement).toBeInTheDocument();
});
