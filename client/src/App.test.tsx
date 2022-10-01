import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Match } from './types';
import { Scorebug } from './components/Scorebug';

test('renders test match', () => {
  const matchTest = new Match(
    'Outlaws',
    'The Firm',
  );
  
  matchTest.addGame({
    homePlayer: 'Chris',
    awayPlayer: 'John',
    homeScore: 1,
    awayScore: 1,
    live: true,
  });


  render(<Scorebug match={matchTest} />);
  const linkElement = screen.getByText(/Outlaws/i);
  expect(linkElement).toBeInTheDocument();
});
