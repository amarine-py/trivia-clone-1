import ClueBox from "./ClueBox";
import ValueBox from "./ValueBox";
import ClueView from "./ClueView";
import { useState } from "react";

export default function GameBoard({
  questions,
  round,
  updateScores,
  scores,
  turn,
}) {
  const values = [
    100 * round,
    200 * round,
    300 * round,
    400 * round,
    500 * round,
  ];
  const [showClue, setShowClue] = useState(false);
  const [displayClueInfo, setDisplayClueInfo] = useState(null);

  function clickClue(question) {
    if (question.category.title) {
      setShowClue(true);
      setDisplayClueInfo(question);
    }
  }

  function onCancel() {
    setShowClue(false);
    setDisplayClueInfo(null);
  }

  function handleClueAnswer(scoreReport) {
    updateScores(scoreReport);
  }

  return (
    <>
      {showClue ? (
        <ClueView
          clue={displayClueInfo}
          onCancel={onCancel}
          onAnswer={handleClueAnswer}
          scores={scores}
          turn={turn}
        />
      ) : (
        <div className="game-board-wrapper">
          <div className="value-row">
            {values.map((v) => {
              return <ValueBox key={v} value={v} />;
            })}
          </div>
          <div className="board-layout">
            {questions.map((q) => {
              return (
                <ClueBox
                  key={q.id}
                  questionData={q}
                  onClick={() => clickClue(q)}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
