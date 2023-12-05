import { useContext, useState } from "react";
import PlayerContext from "../context/PlayerContext";
import CountDownTimer from "./CountDownTimer";

export default function FinalJeopardy({
  clue,
  scores,
  updateScores,
  finishGame,
}) {
  const [wagerMode, setWagerMode] = useState(true);
  const [questionMode, setQuestionMode] = useState(false);
  const [answerMode, setAnswerMode] = useState(false);
  const [wagers, setWagers] = useState({
    player1Wager: 0,
    player2Wager: 0,
    player3Wager: 0,
  });
  const [badWagers, setBadWagers] = useState([false, false, false]);
  const playerNames = useContext(PlayerContext);
  let player1Score = scores[0];
  let player2Score = scores[1];
  let player3Score = scores[2];
  const maxWager1 = Math.max(player1Score, 0);
  const maxWager2 = Math.max(player2Score, 0);
  const maxWager3 = Math.max(player3Score, 0);
  const finalJeopardyTheme = new Audio("./audio/final-jeopardy-theme.mp3");

  const handleChange = (evt) => {
    const nextWagers = { ...wagers };
    nextWagers[evt.target.name] = parseInt(evt.target.value);
    setWagers(nextWagers);
  };

  function areWagersInvalid() {
    let bad1 = false;
    let bad2 = false;
    let bad3 = false;
    if (wagers.player1Wager > maxWager1) {
      bad1 = true;
    }
    if (wagers.player2Wager > maxWager2) {
      bad2 = true;
    }
    if (wagers.player3Wager > maxWager3) {
      bad3 = true;
    }
    setBadWagers([bad1, bad2, bad3]);

    return bad1 || bad2 || bad3;
  }

  const handleModeChange = () => {
    if (areWagersInvalid()) {
    } else {
      if (wagerMode) {
        setWagerMode(false);
        setQuestionMode(true);
        finalJeopardyTheme.play();
      } else if (questionMode) {
        setQuestionMode(false);
        setAnswerMode(true);
      }
    }
  };

  function changeScore(player, result) {
    let correct;
    let incorrect = [];
    let value;
    const id = null;

    if (result < 0) {
      correct = -1;
      incorrect.push(player);
    } else {
      correct = player;
    }

    switch (player) {
      case 0:
        value = wagers.player1Wager;
        break;
      case 1:
        value = wagers.player2Wager;
        break;
      case 2:
        value = wagers.player3Wager;
        break;
    }
    const report = {
      correct,
      incorrect,
      value,
      id,
    };
    updateScores(report);
  }

  return (
    <div className="final-jeopardy-wrapper">
      {wagerMode && (
        <div className="final-jeopardy-wager-wrapper">
          <div className="final-jeopardy-wager-header">
            <h1>Final Jeopardy!</h1>
            <p className="final-jeopardy-text">
              All contestants will need a pen and paper
            </p>
          </div>
          <div className="final-jeopardy-wager-body">
            <p className="final-jeopardy-category-text">
              {`Category: `}
              <span className="final-jeopardy-span">{`${clue.category.title}`}</span>
            </p>
            <p className="final-jeopardy-text">Each contestant must wager:</p>
            <div className="final-jeopardy-wager-form">
              <div className="player1-wager">
                {maxWager1 > 0 ? (
                  <>
                    <div className="row">
                      <label
                        className="final-jeopardy-name"
                        htmlFor="player1Wager"
                      >
                        {playerNames[0] ? `${playerNames[0]}: ` : "Player 1: "}
                      </label>
                      <input
                        type="number"
                        placeholder={`Max wager of: ${player1Score}`}
                        className="final-jeopardy-wager-input"
                        id="player1Wager"
                        name="player1Wager"
                        min={0}
                        max={player1Score}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {badWagers[0] && (
                      <p className="bad-final-wager">
                        Your wager is invalid. Please wager again.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="bad-final-wager">{`${playerNames[0]} has a negative score and cannot participate`}</p>
                )}
              </div>
              <div className="player2-wager">
                {maxWager2 > 0 ? (
                  <>
                    <div className="row">
                      <label
                        className="final-jeopardy-name"
                        htmlFor="player2Wager"
                      >
                        {playerNames[1] ? `${playerNames[1]}: ` : "Player 2: "}
                      </label>
                      <input
                        type="number"
                        placeholder={`Max wager of: ${player2Score}`}
                        className="final-jeopardy-wager-input"
                        id="player2Wager"
                        name="player2Wager"
                        min={0}
                        max={player2Score}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {badWagers[1] && (
                      <p className="bad-final-wager">
                        Your wager is invalid. Please wager again.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="bad-final-wager">{`${playerNames[1]} has a negative score and cannot participate`}</p>
                )}
              </div>
              <div className="player3-wager">
                {maxWager3 > 0 ? (
                  <>
                    <div className="row">
                      <label
                        className="final-jeopardy-name"
                        htmlFor="player1Wager"
                      >
                        {playerNames[2] ? `${playerNames[2]}: ` : "Player 3: "}
                      </label>
                      <input
                        type="number"
                        placeholder={`Max wager of: ${player3Score}`}
                        className="final-jeopardy-wager-input"
                        id="player3Wager"
                        name="player3Wager"
                        min={0}
                        max={player3Score}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {badWagers[2] && (
                      <p className="bad-final-wager">
                        Your wager is invalid. Please wager again.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="bad-final-wager">{`${playerNames[2]} has a negative score and cannot participate`}</p>
                )}
              </div>
            </div>
            <div className="final-jeopardy-wager-button">
              <button className="wager-button" onClick={handleModeChange}>
                Place Wagers and Start Timer
              </button>
            </div>
          </div>
        </div>
      )}
      {questionMode && (
        <div className="final-jeopardy-question-wrapper">
          <CountDownTimer initialTime={30} action={handleModeChange} />
          <div className="final-jeopardy-question-category-text">
            Category: {clue.category.title}
          </div>
          <div className="final-jeopardy-question-text">{clue.question}</div>
        </div>
      )}
      {answerMode && (
        <div className="final-jeopardy-answer-wrapper">
          <div className="final-jeopardy-question-text2">{clue.question}</div>
          <div className="final-jeopardy-answer-text">{clue.answer}</div>
          <div className="final-jeopardy-answer-buttons">
            <div className="player1-buttons">
              {maxWager1 > 0 ? (
                <>
                  <p className="final-jeopardy-text">
                    {"Did "} {playerNames[0] || "Player 1"}{" "}
                    {"answer correctly?"}
                  </p>
                  <button onClick={() => changeScore(0, wagers[0])}>Yes</button>
                  <button
                    onClick={() => changeScore(0, wagers["player1Wager"] * -1)}
                  >
                    No
                  </button>
                </>
              ) : null}
            </div>
            <div className="player2-buttons">
              {maxWager2 > 0 ? (
                <>
                  <p className="final-jeopardy-text">
                    {"Did "} {playerNames[1] || "Player 2"}{" "}
                    {"answer correctly?"}
                  </p>
                  <button onClick={() => changeScore(1, wagers[1])}>Yes</button>
                  <button
                    onClick={() => changeScore(1, wagers["player2Wager"] * -1)}
                  >
                    No
                  </button>
                </>
              ) : null}
            </div>

            <div className="player3-buttons">
              {maxWager3 > 0 ? (
                <>
                  <p className="final-jeopardy-text">
                    {"Did "} {playerNames[2] || "Player 3"}{" "}
                    {"answer correctly?"}
                  </p>
                  <button onClick={() => changeScore(2, wagers[2])}>Yes</button>
                  <button
                    onClick={() => changeScore(2, wagers["player3Wager"] * -1)}
                  >
                    No
                  </button>
                </>
              ) : null}
            </div>
            <div className="final-submit-button">
              <button onClick={finishGame}>Calculate Winner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
