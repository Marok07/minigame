export function WinCount({ counts }) {
    return (
        <div className="win-count">
            <div className="player">
                <p>X</p>
                <span>{counts.xWins}</span>
            </div>
            <div className="player">
                <p>Tie</p>
                <span>{counts.ties}</span>
            </div>
            <div className="player">
                <p>O</p>
                <span>{counts.oWins}</span>
            </div>
        </div>
    );
}
