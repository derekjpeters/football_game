import { useEffect, useRef } from "react";
export default function useInterval(callback: () => void, delay: number | null) {
    const saved = useRef(callback);
    useEffect(() => { saved.current = callback; }, [callback]);
    useEffect(() => {
        if (delay === null) return;
        const id = setInterval(() => saved.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}

// setTimeout(() => dosomething(), 2000);
/*
setTimeout(function tick() {
    dosomething();
    setTimeout(tick, 2000);
},2000)

const saved = useRef(callback)
useEffect(() => { saved.current = callback; }, [callback])

doSomething() <- takes some time and needs a trigger tied to setTimeout()
setTimeout  again <- will have to start again after the 2000ms delay and cannot run tandem with other code

setInterval schedules independently 
tick       tick        tick
2000ms      2000ms      2000ms

- blinking LED (simulation)
- yardline advancement
- CPU AI movement
- quarter timer

*/