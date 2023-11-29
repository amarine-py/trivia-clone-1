import PlayerScoreBoard from "./PlayerScoreBoard";

export default function GameStatusBoard({playerNames, scores, round}) {

    return (
        <div className="game-status-wrapper">
          <div className="round-status">
            <p className="round-status-text">{round}</p>
          </div>
        <div className="game-scores">
          <PlayerScoreBoard playerName={playerNames[0]} score={scores[0]} />
          <PlayerScoreBoard playerName={playerNames[1]} score={scores[1]} />
          <PlayerScoreBoard playerName={playerNames[2]} score={scores[2]} />
        </div>
      </div>
    );
}