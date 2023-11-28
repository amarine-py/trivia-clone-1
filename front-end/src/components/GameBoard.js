import ClueBox from "./ClueBox";
import ValueBox from "./ValueBox";
import ClueView from "./ClueView";
import { useState, useEffect } from "react";
import { fetchRandomQuestionsByNumAndRound } from "../services/gameAPI";

export default function GameBoard({ questions, round, updateScores }) {
  // Create a gameboard populated with 20 clues ***
  // Clues should be organized by value instead of by category ***
  // Values for first round are: $100, $200, $300, $400, $500  ***
  // Values for double jeopardy are: $200, $400, $600, $800, $1000
  // Each clue box should have a category displayed before being selected
  // Above each column of clues will be a value box
  // Each value box will have the value of the clues in that column
  // We will need different components for clues and values
  // We will need to pass props with an onClick function and question data
  // for the ClueBox components
  // We will also need to create a function in gameAPI.js that will randomly
  // grab clues of a certain value from jService API
  // This will mean 5 API calls for each round. Since 100 clues can be loaded at once,
  // we will need to randomly select the clue number and the offset to get a random selection
  // of clues to use in each clue box. We will need to pass the category, clue, and value
  // for each clue as props.
  // We will need to account for these things: tracking if answer was correct; who answered the clue;
  // if the answer was correct, we add the value to that person's score; if incorrect, we subtract clue value;
  // and changing the display of a previously selected clue so it can't be clicked again.

  //   const [round, setRound] = useState(1);
  const values = [
    100 * round,
    200 * round,
    300 * round,
    400 * round,
    500 * round,
  ];
  //   const [turn, setTurn] = useState(Math.floor(Math.random() * 3)); // This should equate to 0, 1, or 2
  const [showClue, setShowClue] = useState(false);
  const [displayClueInfo, setDisplayClueInfo] = useState(null);
  var clueTimer;

  function clickClue(question) {
    setShowClue(true);
    console.log("show clue!!!");
    console.log(question.id);
    setDisplayClueInfo(question);
  }

  function onCancel() {
    clearTimeout(clueTimer);
    setShowClue(false);
    setDisplayClueInfo(null);
  }

  if (!questions) {
    return (
      <div className="loading-wrapper">
        <p className="questions-loading">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {showClue ? (
        <ClueView clue={displayClueInfo} onCancel={onCancel} />
      ) : (
        <div id="game-board" className="game-board-main">
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
