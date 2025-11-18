import { useCallback, useEffect, useMemo, useState } from "react";
import useInterval from "../hooks/useInterval";

type Lane = 0 | 1 | 2 | 3 | 4;

interface Props {
    onGain: (yards: number) => void; //called when a player reaches the far right for testing
    onHit: (yardsPenalty: number) => void; //called on a collision or hit
    speedMs?: number; //tick speed
}

const COLS = 16; //This should give is a narrow classic look - feel
const LANES: Lane[] = [ 0, 1, 2, 3, 4 ]; 

export default function RetroMattel({ onGain, onHit, speedMs = 250 }: Props) {
    const [lane, setLane] = useState<Lane>(2); //player lane middle
    const [col, setCol] = useState<number>(1); //player column (start near the left)
    const [defenders, setDefenders] = useState<Array<{lane: Lane; col: number}>>([]);
    const [running, setRunning] = useState(true);

    //spawn defenders on the right edge that the player (user) has to dodge
    const spawn = useCallback(() => {
        //40% chance to spawn 1-2 defenders in random lanes
        if (Math.random() < 0.4) {
            const count = Math.random() < 0.5 ? 1 : 2;
            const newOnes: Array< { lane: Lane; col: number } > = [];
            const lanesPool = [...LANES]

            for (let i = 0; i < count; i++) {
                const idx = Math.floor(Math.random() * lanesPool.length);
                const chosen = lanesPool.splice(idx, 1)[0];
                newOnes.push( {lane: chosen as Lane, col: COLS - 2}); // near the right or right-middle
                //lanesPool = [1,2,3]
                //idx = 2
                //lanesPool.splice(2,1) -> [3]
                //...splice(idx, 1)[0]
                //chosen = 3 a random defender will generate in lane 3
                //lanesPool becomes -> [1,2] //mutate the orginal array
            }
                setDefenders((d) => [...d, ...newOnes]);
        }
    }, []);
        const step = useCallback(() => {
            setDefenders((prev) => 
                prev
                .map((d) => ({ ...d, col: d.col -1}))
                .filter((d) => d.col >= 0)
            );

            //Player advances
            setCol((c) => Math.min(COLS - 1, c+1));

            //collision check
            setDefenders((prev) => {
                const hit = prev.some(id) => d.lane === lane && d.col === col;
                if (hit) {
                    //if a collision happens result is a tackle and position is reset
                    onHit(-5);
                    setCol(1);
                    return []; //set defenders (to an empty array after a tackle is made)
                }
                return prev;
            })

            // reached far right -> big gain, reset player, keep the game moving
            if (col >= COLS - 1) {
                onGain(10);
                setCol(1);
            }

        }

        /*
            Lane1   .   D   .   .
            Lane2   .   .   .   .
            Lane3   P ->PD   .   D
            Lane4   .   .   D   .
                    0   1   2   3   4   
        */

}