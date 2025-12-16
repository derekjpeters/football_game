// src/components/TeamPicker.tsx
import { useEffect, useState } from "react";
import api from "../api/client";

type TeamOption = { id: number; code: "HOME" | "AWAY"; name: string };

interface Props {
	onApplied: (g: any) => void;
}

export default function TeamPicker({ onApplied }: Props) {
	const [teams, setTeams] = useState<TeamOption[]>([]);
	const [homeId, setHomeId] = useState(1);
	const [awayId, setAwayId] = useState(3);
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		(async () => {
			const res = await api.get<TeamOption[]>("/teams");
			setTeams(res.data);
		})();
	}, []);

	async function apply() {
		setBusy(true);
		try {
			const res = await api.post("/game/teams", {
				homeTeamId: homeId,
				awayTeamId: awayId,
			});
			onApplied(res.data);
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="w-full max-w-xl bg-white rounded-lg shadow p-4 space-y-3">
			<h3 className="text-lg font-semibold text-gray-800">Team Selection</h3>
			<div className="grid grid-cols-2 gap-4">
				<label className="flex flex-col text-sm">
					<span className="text-gray-600 mb-1">Home Team</span>
					<select
						className="border rounded p-2"
						value={homeId}
						onChange={(e) => setHomeId(Number(e.target.value))}
					>
						{teams
							.filter((t) => t.code === "HOME")
							.map((t) => (
								<option key={`H${t.id}`} value={t.id}>
									{t.name}
								</option>
							))}
					</select>
				</label>
				<label className="flex flex-col text-sm">
					<span className="text-gray-600 mb-1">Away Team</span>
					<select
						className="border rounded p-2"
						value={awayId}
						onChange={(e) => setAwayId(Number(e.target.value))}
					>
						{teams
							.filter((t) => t.code === "AWAY")
							.map((t) => (
								<option key={`A${t.id}`} value={t.id}>
									{t.name}
								</option>
							))}
					</select>
				</label>
			</div>
			<button
				onClick={apply}
				disabled={busy}
				className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
			>
				{busy ? "Applying..." : "Apply Teams"}
			</button>
		</div>
	);
}
