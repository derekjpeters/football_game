// src/components/Field.tsx
interface FieldProps {
	yardline: number; // 0..100
	possession: "HOME" | "AWAY";
	homeLabel: string;
	awayLabel: string;
}
export default function Field({
	yardline,
	possession,
	homeLabel,
	awayLabel,
}: FieldProps) {
	return (
		<div className="w-full max-w-3xl bg-green-700 rounded-lg shadow p-4">
			<div className="flex justify-between text-white text-sm mb-2">
				<span>{homeLabel}</span>
				<span>{awayLabel}</span>
			</div>
			<div className="relative h-32 bg-green-600 rounded border-4 border-green-800 overflow-hidden">
				<div className="absolute inset-0 grid grid-cols-10">
					{Array.from({ length: 11 }).map((_, i) => (
						<div key={i} className="border-l border-green-300/50" />
					))}
				</div>
				<div
					className="absolute top-1/2 -translate-y-1/2"
					style={{ left: `calc(${yardline}% - 8px)` }}
				>
					<div className="w-4 h-4 rounded-full bg-amber-800 border border-amber-900 shadow" />
				</div>
			</div>
			<div className="flex justify-between text-xs text-white/90 mt-2">
				<span>
					Possession: <b>{possession}</b>
				</span>
				<span>
					Yardline: <b>{Math.round(yardline)}</b>
				</span>
			</div>
		</div>
	);
}
