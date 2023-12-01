import StartNewGame from "../pages/StartNewGame";

export default function DeclareWinner({winner}) {

    return (
        <div className="declare-winner-wrapper">
            <div className="winner-text">{`Congratulations, ${winner}. You are the new Jeopardy champion!!!`}</div>
            <StartNewGame />
        </div>
    );
}