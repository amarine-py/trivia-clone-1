import { useState } from "react";
import CountDownTimer from "./CountDownTimer";

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
  const maxWager = Math.max(1000, scores[turn]);
  let newValue;

  const handleChange = (evt) => {
    newValue = evt.target.value;
    setValue(newValue);
  };

  function onWager() {
    setAnswerMode(true);
  }

  return (
    <div className="daily-double-wrapper">
      <div className="daily-double-header">Daily Double!</div>
      <>
      {answerMode ? (
      <div className="daily-double-answer-mode">
        <CountDownTimer initialTime={10} />
        <p>{`For $${value}`}</p>
        <p>{clue.question}</p>
        {showAnswer && (<p>{clue.answer}</p>)}
        <div className="daily-double-answer-buttons">
            <button onClick={() => setShowAnswer(true)}>Show Answer</button>
            <button>Correct!</button>
            <button>Wrong</button>
        </div>
      </div>)
      :
      (<><div className="daily-double-wager">
        <p>{`Category: ${clue.category.title}`}</p>
        <p>{`You can wager anything up to: $${scores[turn]}.`}</p>
        <p>How much would you like to wager?</p>
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
      </div></>)
        }
      </>
    </div>
  );
}
