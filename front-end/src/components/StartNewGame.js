import { Link } from "react-router-dom";

export default function StartNewGame() {

    return (
        <div id="start-new-game">
            <Link className="value-text" id="start-new-game" to="/new-game" >Start New Game</Link>
        </div>
    );
}