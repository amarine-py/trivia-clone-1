import CountDownTimer from "./CountDownTimer";
import { useState } from "react";

export default function Modal({ setShowModal, clue, makeAnswerReport, onCancel }) {
  const { id, answer, question, value } = clue;
  const [showAnswer, setShowAnswer] = useState(false);

  function createAnswerReport(correct, incorrect) {
    const answerReport = {
      correct: correct,
      incorrect: incorrect,
      value: value,
      id: id,
    };
    console.log(`argument correct: ${correct}, answerReport: ${answerReport}`);
    makeAnswerReport(answerReport);
    setShowModal(false);
  }

  return (
    <div className="modal-wrapper">
      <CountDownTimer initialTime={5} />
      <div className="modal-answer-text">
        {!showAnswer ? `${question}` : `${answer}`}
      </div>
      <div className="modal-button-wrapper">
        <div className="action-buttons">
          <button onClick={() => createAnswerReport(-1, [])}>No Answer</button>
          <button onClick={() => setShowAnswer(true)}>Show Answer</button>
        </div>
        <div className="answer-buttons">
            <div>
            <button onClick={() => createAnswerReport(0, [])}>
            Player 1 Correct!
          </button>
          <button onClick={() => createAnswerReport(-1, [0])}>
            Player 1 Wrong!
          </button>
            </div>
            <div>
            <button onClick={() => createAnswerReport(1, [])}>
            Player 2 Correct!
          </button>
          <button onClick={() => createAnswerReport(-1, [1])}>
            Player 2 Wrong!
          </button>
            </div>
          <div>
          <button onClick={() => createAnswerReport(2, [])}>
            Player 3 Correct!
          </button>
          <button onClick={() => createAnswerReport(-1, [2])}>
            Player 3 Wrong!
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
