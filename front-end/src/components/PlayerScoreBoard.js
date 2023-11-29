export default function PlayerScoreBoard({ playerName, score }) {
  return (
    <div className="player-score">
      <div className="score-outer">
        <div className="score-side"></div>
        <div className="score-inner">
          <div className="score-display">
            <p className="score-text">{score}</p>
          </div>
          <div className="name-display">
            <p className="player-name-text">{playerName}</p>
          </div>
        </div>
        <div className="score-side"></div>
      </div>
    </div>
  );
}
