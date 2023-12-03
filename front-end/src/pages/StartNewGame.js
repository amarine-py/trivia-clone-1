import { Link } from "react-router-dom";

export default function StartNewGame() {

    return (
        <div id="start-new-game">
            <Link className="start-value-text" to="/register-game" >Start New Game</Link>
        </div>
    );
}