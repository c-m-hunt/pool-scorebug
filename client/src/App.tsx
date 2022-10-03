import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { Scorebug } from './components/Scorebug';
import { useMatchService } from './services/api';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScorebugWrapper />}/>
        <Route path="/admin" element={<AdminWrapper />} />
      </Routes>
    </Router>
  );
}

const ScorebugWrapper = () => {
  const match = useMatchService()
  return (<div className="scorebug-app">
    {match.match && <Scorebug match={match.match} />}
  </div>)
}

const AdminWrapper = () => {
  return (<div>Admin</div>)
}

export default App;
