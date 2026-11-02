import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { WinCount } from "./components/Wincount";

const WIN_COUNT_KEY = "WinCount";
const INITIAL_COUNTS = { xWins: 0, oWins: 0, ties: 0 };

function readWinCount() {
    const savedCounts = localStorage.getItem(WIN_COUNT_KEY);
    if (!savedCounts) return INITIAL_COUNTS;

    try {
        const counts = JSON.parse(savedCounts);
        if (
            typeof counts.xWins === "number" &&
            typeof counts.oWins === "number" &&
            typeof counts.ties === "number"
        ) {
            return counts;
        }
    } catch (error) {
        console.error("Could not read saved win counts.", error);
    }

    return INITIAL_COUNTS;
}

function App() {
    const [counts, setCounts] = useState(readWinCount);

    useEffect(() => {
        localStorage.setItem(WIN_COUNT_KEY, JSON.stringify(counts));
    }, [counts]);

    function handleGameEnd(winner) {
        setCounts((currentCounts) => {
            if (winner === "X") {
                return { ...currentCounts, xWins: currentCounts.xWins + 1 };
            }
            if (winner === "O") {
                return { ...currentCounts, oWins: currentCounts.oWins + 1 };
            }
            return { ...currentCounts, ties: currentCounts.ties + 1 };
        });
    }

    return (
        <div className="App">
            <Board onGameEnd={handleGameEnd} />
            <WinCount counts={counts} />
        </div>
    );
}

export default App;
