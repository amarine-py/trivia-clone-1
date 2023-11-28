import { useState } from "react";

export default function AnswerModal({ clue, player, handleAnswer, setIsOpen }) {
  const { value, question, answer } = clue;

  return (
    <div className="answer-modal-background" onClick={() => setIsOpen(false)}>
      <div className="answer-modal">
        <div className="answer-modal-content">
          <div className="answer-modal-header">
            <h4 className="answer-modal-title">This is answer modal title</h4>
          </div>
          <div className="answer-modal-body">
            <p className="modal-clue-text">{question}</p>
          </div>
          <div className="modal-footer">
            <div className="modal-button-wrapper">
              <button
                className="modal-button correct-answer"
                onClick={() => handleAnswer(player, null, value)}
              >
                Correct
              </button>
              <button
                className="modal-button incorrect-answer"
                onClick={() => handleAnswer(null, player, value)}
              >
                Wrong
              </button>
              <button
              className="modal-button cancel"
              onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
