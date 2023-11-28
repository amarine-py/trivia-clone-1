import { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";

export default function ClueView({ clue, onCancel }) {


  return (
    <div className="clue-view-wrapper">
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
        <button onClick={() => console.log("BUZZZZ")}>Buzz In</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
