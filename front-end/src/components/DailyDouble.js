import { useState, useContext } from "react";
import CountDownTimer from "./CountDownTimer";
import PlayerContext from "../context/PlayerContext";

export default function DailyDouble({
  clue,
  onCancel,
  onAnswer,
  scores,
  turn,
}) {
  const [answerMode, setAnswerMode] = useState(false);
  const [value, setValue] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const playerNames = useContext(PlayerContext);
  const player = getPlayerName();
  const maxWager = Math.max(1000, scores[turn]);
  const correctAnswerAudio = new Audio(
    "http://localhost:3000/audio/right-answer-sound.mp3"
  );
  const wrongAnswerAudio = new Audio(
    "http://localhost:3000/audio/wrong-answer-sound.mp3"
  );
  let newValue;

  const handleChange = (evt) => {
    newValue = parseInt(evt.target.value);
    setValue(newValue);
  };

  function onWager() {
    if (value > maxWager) {
      console.log(`You cannot wager more than: ${maxWager}`);
      return;
    }
    setAnswerMode(true);
  }

  function createAnswerReport(correct, incorrect) {
    if (correct >= 0) {
      correctAnswerAudio.play();
    } else if (incorrect.length > 0) {
      wrongAnswerAudio.play();
    }
    const answerReport = {
      correct: correct,
      incorrect: incorrect,
      value: value,
      id: clue.id,
    };
    onAnswer(answerReport);
    setAnswerMode(false);
    onCancel();
  }

  function getPlayerName() {
    let player;
    switch (turn) {
      case 0:
        player = playerNames[0] || "Player 1";
        break;
      case 1:
        player = playerNames[1] || "Player 2";
        break;
      case 2:
        player = playerNames[2] || "Player 3";
        break;
    }
    return player;
  }

  return (
    <div className="daily-double-wrapper">
      <div className="daily-double-header">Daily Double!</div>
      <>
        {answerMode ? (
          <div className="daily-double-answer-mode">
            <CountDownTimer initialTime={10} />
            <p className="daily-double-answer-mode-wager-text">{`Your wager: $${value}`}</p>
            <p className="daily-double-answer-mode-clue-text">{clue.question}</p>
            {showAnswer && <p className="daily-double-answer-mode-answer-text">{`Correct Answer: ${clue.answer}`}</p>}
            <div className="daily-double-answer-buttons">
              <button onClick={() => setShowAnswer(true)}>Show Answer</button>
              <button onClick={() => createAnswerReport(turn, [])}>
                Correct!
              </button>
              <button onClick={() => createAnswerReport(-1, [turn])}>
                Wrong
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="daily-double-wager">
              <p>{player}</p>
              <p>{`Category: ${clue.category.title}`}</p>
              <p>{`You can wager anything up to: $${scores[turn]}.`}</p>
              <p>How much would you like to wager?</p>
              {`$ `} 
              <input
                type="number"
                placeholder="Enter your wager"
                className="daily-double-wager-input"
                id="dailyDoubleWager"
                name="dailyDoubleWager"
                min={0}
                max={maxWager}
                onChange={handleChange}
                required
              />
            </div>
            <div className="daily-double-wager-buttons">
              <button onClick={onWager}>Wager</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </>
        )}
      </>
    </div>
  );
}
