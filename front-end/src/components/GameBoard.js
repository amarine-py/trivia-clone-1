import ClueBox from "./ClueBox";
import ValueBox from "./ValueBox";
import ClueView from "./ClueView";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";

export default function GameBoard({ questions, round, updateScores, scores, turn }) {
  const [loaded, setLoaded] = useState(false);
  const values = [
    100 * round,
    200 * round,
    300 * round,
    400 * round,
    500 * round,
  ];
  const [showClue, setShowClue] = useState(false);
  const [displayClueInfo, setDisplayClueInfo] = useState(null);

  useEffect(() => {
    questions[0]?.id ? setLoaded(true) : setLoaded(false);
  }, []);

  function clickClue(question) {
    setShowClue(true);
    setDisplayClueInfo(question);
  }

  function onCancel() {
    setShowClue(false);
    setDisplayClueInfo(null);
  }

  function handleClueAnswer(scoreReport) {
    updateScores(scoreReport);
  }

  if (!loaded) {
    return (
      <LoadingSpinner />
    );
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
