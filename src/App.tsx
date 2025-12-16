import { useState, useEffect } from "react";
import type { Score, Team, GameStatus, GameStateDTO } from "./types";
import Scoreboard from "./components/Scoreboard";
import Controls from "./components/Controls";
import TeamPicker from "./components/TeamPicker";
import Field from "./components/Field";
import RetroMattel from "./components/RetroMattel";
import api from "./api/client";

export default function App() {
	const [score, setScore] = useState<Score>({ HOME: 0, AWAY: 0 });
	const [possession, setPossession] = useState<Team>("HOME");
	const [quarter, setQuarter] = useState<1 | 2 | 3 | 4>(1);
	const [status, setStatus] = useState<GameStatus>("IN_PROGRESS");
	const [yardline, setYardline] = useState<number>(25);
	const [homeTeamName, setHomeTeamName] = useState("HOME");
	const [awayTeamName, setAwayTeamName] = useState("AWAY");

	function sync(g: GameStateDTO) {
		setScore(g.score);
		setPossession(g.possesion);
		setQuarter(g.quarter);
		setStatus(g.status);
		setYardline(g.yardline);
		setHomeTeamName(g.homeTeamName);
		setAwayTeamName(g.awayTeamName);
	}

	useEffect(() => {
		(async () => {
			const res = await api.get<GameStateDTO>("/game");
			sync(res.data);
		})();
	}, []);

	async function handleScore(team: Team, pts: number) {
		if (status === "FINAL") return;
		const res = await api.patch<GameStateDTO>("/game/score", {
			team,
			delta: pts,
		});
		sync(res.data);
	}

	async function togglePossession() {
		if (status === "FINAL") return;
		const next = possession === "HOME" ? "AWAY" : "HOME";
		const res = await api.patch<GameStateDTO>("/game/possession", {
			team: next,
		});
		sync(res.data);
	}

	function nextQuarter() {
		setQuarter((q) => {
			if (q < 4) return (q + 1) as 1 | 2 | 3 | 4;
			setStatus("FINAL");
			return q;
		});
	}

	async function resetGame() {
		const res = await api.post<{ message: string; gameState: GameStateDTO }>(
			"/game/reset"
		);
		sync(res.data.gameState);
	}

	async function gainYards(y: number) {
		const res = await api.patch("/game/yardline", { delta: y });
		sync(res.data);
	}

	return (
		<main className="min-h-screen flex flex-col items-center p-6 bg-slate-100">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">
				Football Game - Feature 2
			</h1>
			<Scoreboard
				score={score}
				possession={possession}
				quarter={quarter}
				status={status}
			/>
			<Controls
				onScore={handleScore}
				onToggle={togglePossession}
				onNextQuarter={nextQuarter}
				onReset={resetGame}
				disabled={status === "FINAL"}
			/>

			{status === "FINAL" && (
				<div className="mt-4 w-full max-w-xl p-3 rounded border bg-red-50 border-red-500 text-red-800 text-sm">
					Game Over - Use <span className="font-semibold">Reset Game</span> to
					Start a New One!
				</div>
			)}
		</main>
	);
}
