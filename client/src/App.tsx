import React from 'react';
import './App.css';
import { Scorebug } from './components/Scorebug';
import { useMatchService } from './services/api';


const App = () => {

  const match = useMatchService()

  return (
    <div className="scorebug-app">
      {match.match && <Scorebug match={match.match} />}
    </div>
  );
}

export default App;
