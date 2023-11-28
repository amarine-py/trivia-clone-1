import { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";
import Modal from "./Modal";

export default function ClueView({ clue, onCancel, onAnswer }) {
  const [showModal, setShowModal] = useState(false);

  function reportAnswerResult(answerResult) {
    onAnswer(answerResult);
    onCancel();
  }

  return (
    <div className="clue-view-wrapper">
      {showModal ? (
        <Modal setShowModal={setShowModal} clue={clue} makeAnswerReport={reportAnswerResult} />
      ) : (
        <>
          <div className="clue-view-timer">
            <CountDownTimer initialTime={10} />
          </div>
          <div className="clue-view-header">
            <h4 className="clue-view-title">{`${clue.category} - $${clue.value}`}</h4>
          </div>
          <div className="clue-view-content">
            <p className="clue-view-text">{clue.question}</p>
          </div>
          <div className="clue-view-footer">
            <button onClick={() => setShowModal(true)}>Buzz In</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
