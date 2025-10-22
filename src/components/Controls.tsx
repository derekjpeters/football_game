import type { Team } from "../types";

interface ControlsProps {
	onScore: (team: Team, pts: number) => void;
	onToggle: () => void;
}

export default function Controls({ onScore, onToggle }: ControlsProps) {
	return (
		<section className="bg-white rounded-lg shadow p-4 w-full max-w-xl mt-4">
			<h2 className="text-xl font-bold text-gray-800 mb-2">Controls</h2>
			<div className="flex items-center justify-between">
				<div className="space-x-2">
					<h3 className="font-semibold text-gray-600">Home</h3>
					<button
						className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
						onClick={() => onScore("HOME", 3)}
					>
						+3
					</button>
					<button
						className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
						onClick={() => onScore("HOME", 6)}
					>
						+6
					</button>
				</div>

				<button
					className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
					onClick={onToggle}
				>
					Toggle Possession
				</button>

				<div className="space-x-2 text-right">
					<h3 className="font-semibold text-gray-600">Away</h3>
					<button
						className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={() => onScore("AWAY", 3)}
					>
						+3
					</button>
					<button
						className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={() => onScore("AWAY", 6)}
					>
						+6
					</button>
				</div>
			</div>
		</section>
	);
}
