export default function PlayerScoreBoard({ playerName, score }) {
  return (
    <div className="player-score">
      <div className="score-outer">
        <div className="score-side-left">
          <div className="vertical-stripe"></div>
          <div className="vertical-stripe"></div>
        </div>
        <div className="score-inner">
          <div className="score-display">
            <p
              className={score >= 0 ? "score-text" : "score-text negative"}
            >{`$${score}`}</p>
          </div>
          <div className="name-display">
            <p className="player-name-text">{playerName}</p>
          </div>
        </div>
        <div className="score-side-right">
          <div className="vertical-stripe"></div>
          <div className="vertical-stripe"></div>
        </div>
      </div>
    </div>
  );
}
