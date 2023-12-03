import { useState } from "react";
import CountDownTimer from "./CountDownTimer";
import AnswerModal from "./AnswerModal";
import DailyDouble from "./DailyDouble";

export default function ClueView({ clue, onCancel, onAnswer, scores, turn }) {
  const [showModal, setShowModal] = useState(false);
  const category = clue.category.title.toUpperCase();

  function reportAnswerResult(answerResult) {
    onAnswer(answerResult);
    onCancel();
  }

  if (clue.dailyDouble) {
    return (
      <div className="clue-view-wrapper">
        <DailyDouble
          clue={clue}
          onCancel={onCancel}
          onAnswer={onAnswer}
          scores={scores}
          turn={turn}
        />
      </div>
    );
  }

  return (
    <div className="clue-view-wrapper">
      {showModal ? (
        <AnswerModal
          setShowModal={setShowModal}
          clue={clue}
          makeAnswerReport={reportAnswerResult}
        />
      ) : (
        <>
          <div className="clue-view-timer">
            <CountDownTimer initialTime={10} />
          </div>
          <div className="clue-view-header">
            <h1 className="clue-view-title">{`${category} - $${clue.value}`}</h1>
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
