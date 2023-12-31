import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Admin } from "./components/Admin";
import { Scoreboard } from "./components/Scoreboard";
import { Scorebug } from "./components/Scorebug";
import { useLiveScorebugService } from "./services/liveService";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/admin" element={<Admin />} />
				<Route path="/scoreboard" element={<ScoreboardWrapper />} />
				<Route path="/scorebug" element={<ScorebugWrapper />} />
			</Routes>
		</Router>
	);
};

const ScorebugWrapper = () => {
	const { scorebug } = useLiveScorebugService();
	return (
		<div className="scorebug-app">
			{scorebug && (
				<Scorebug
					match={scorebug.match}
					games={scorebug.games}
					config={scorebug.config}
				/>
			)}
		</div>
	);
};

const ScoreboardWrapper = () => {
	const { scorebug } = useLiveScorebugService();
	return (
		<div>
			{scorebug && (
				<Scoreboard
					match={scorebug.match}
					games={scorebug.games}
					config={scorebug.config}
				/>
			)}
		</div>
	);
};

export default App;
