import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Admin } from "./components/Admin";
import { Scorebug } from "./components/Scorebug";
import { useLiveScorebugService } from "./services/liveService";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/scorebug" element={<ScorebugWrapper />} />
				<Route path="/admin" element={<AdminWrapper />} />
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

const AdminWrapper = () => {
	return <Admin />;
};

export default App;
