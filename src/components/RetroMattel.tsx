// src/components/RetroMattel.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import useInterval from "../hooks/useInterval";

type Lane = 0 | 1 | 2 | 3 | 4;


interface Props {
	onGain: (yards: number) => void; // called when player reaches far right
	onHit: (yardsPenalty: number) => void; // called on collision
	speedMs?: number; // tick speed
}

const COLS = 16; // classic narrow screen
const LANES: Lane[] = [0, 1, 2, 3, 4];

export default function RetroMattel({ onGain, onHit, speedMs = 250 }: Props) {
	const [lane, setLane] = useState<Lane>(2); // player lane (middle)
	const [col, setCol] = useState<number>(1); // player column (start near left)
	const [defenders, setDefenders] = useState<
		Array<{ lane: Lane; col: number }>
	>([]);
	const [running, setRunning] = useState(true);

	// spawn defenders on right edge occasionally
	const spawn = useCallback(() => {
		// 40% chance to spawn 1–2 defenders in random lanes
		if (Math.random() < 0.4) {
			const count = Math.random() < 0.5 ? 1 : 2;
			const newOnes: Array<{ lane: Lane; col: number }> = [];
			const lanesPool = [...LANES];
			for (let i = 0; i < count; i++) {
				const idx = Math.floor(Math.random() * lanesPool.length);
				const chosen = lanesPool.splice(idx, 1)[0];
				newOnes.push({ lane: chosen as Lane, col: COLS - 2 }); // near the right
			}
			setDefenders((d) => [...d, ...newOnes]);
		}
	}, []);

	const step = useCallback(() => {
		// move defenders left
		setDefenders((prev) =>
			prev.map((d) => ({ ...d, col: d.col - 1 })).filter((d) => d.col >= 0)
		);

		// player auto-advances slightly
		setCol((c) => Math.min(COLS - 1, c + 1));

		// collision check
		setDefenders((prev) => {
			const hit = prev.some((d) => d.lane === lane && d.col === col);
			if (hit) {
				// collision: small penalty & reset position
				onHit(-5);
				setCol(1);
				return []; // clear defenders after a hit (classic "down/reset" feel)
			}
			return prev;
		});

		// reached far right ⇒ big gain, reset player, keep the rush
		if (col >= COLS - 1) {
			onGain(10);
			setCol(1);
		}

		// sometimes spawn new defenders
		spawn();
	}, [lane, col, onHit, onGain, spawn]);

    useInterval(() => running && step(), running ? speedMs : null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") setLane((l) => (l > 0 ? ((l-1) as Lane) : l))
            if (e.key === "ArrowDown") setLane((l) => (l < 4 ? ((l+1) as Lane): l));
            if (e.key === " ") setRunning((r) => !r);
            if (e.key === "ArrowRight") setCol((c) => Math.min(COLS -1, c + 1));
        };
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey);
    }, [])

    const grid = useMemo(() => {
        //this will build our 5x16 grid
        const g = Array.from({ length:5 }, () => Array(COLS).fill(false));
        defenders.forEach((d) => {
            if (d.lane >= 0 && d.lane <= 4 && d.col >=0 && d.col < COLS) g[d.lane] [d.col] = true;
        })
        return g;
    }, [defenders]);

    return (
        <div className="w-full max-w-xl bg-black-rounded-2xl p-4 shadow relative">
            <div className="text-center text-green-400 text-sm mb-2">Classic Game Mode{running ? "●" : "■"}</div>
            <div className="grid grid-rows-5 gap-2">
                {Array.from({ length:COLS }).map((_, c)=> {
                    const isPlayer = r === lane && c === col;
                    const isDef = grid [r] [c];
                    const on = isPlayer || isDef;
                    return (
                        <div 
                        key = {c}
                        className="{`w-3 h-3 rounded-full ${

                        }`}"
                    )
                })}
            </div>
        </div> 
    )