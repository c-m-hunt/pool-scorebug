import { render, screen } from "@testing-library/react";
import { config } from "process";
import React from "react";
import { Scorebug } from "./components/Scorebug";
import { Config, Match } from "./types";

const matchTest: Match = {
	homeTeam: "Home Team",
	awayTeam: "Away Team",
	homeScore: 0,
	awayScore: 0,
	games: [
		{
			homePlayer: "Home Player",
			awayPlayer: "Away Player",
			homeScore: 0,
			awayScore: 0,
			live: true,
		},
	],
};

const configTest: Config = {
	showTeamScore: true,
	showPlayerScore: true,
};

test("renders test match", () => {
	render(<Scorebug match={matchTest} config={configTest} />);
	const linkElement = screen.queryByText(/Home Team/i);
	expect(linkElement).toBeInTheDocument();
});

test("renders test match with team", () => {
	const configTest2 = { showPlayerScore: true, showTeamScore: false };
	render(<Scorebug match={matchTest} config={configTest2} />);
	const linkElement = screen.queryByText(/Home Team/i);
	expect(linkElement).toBeNull();
});
