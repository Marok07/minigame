export const LEFT = "left";
export const RIGHT = "right";

export function Square({ value, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick(RIGHT);
    }
    return (
        <button className="square" onClick={() => onSquareClick(LEFT)} onContextMenu={handleContextMenu}>
            {value}
        </button>
    );
}
