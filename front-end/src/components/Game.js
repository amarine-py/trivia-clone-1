import { useState, useEffect } from "react";
import { fetchRandomQuestionsByNumAndRound } from "../services/gameAPI";
import GameBoard from "./GameBoard";

export default function Game() {
  const [questions, setQuestions] = useState(null);
//   const [player1, player2, player3] = playerNames;
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);

  useEffect(() => {
    fetchRandomQuestionsByNumAndRound(20, round).then((data) => {
      setQuestions(data);
    });
  }, [round]);

  function updateScores(correct, incorrect, value) {
    let updatedScores = scores.slice();
    if (correct) {
      updatedScores[correct] += value;
    }
    if (incorrect) {
      for (let idx of incorrect) {
        updatedScores[idx] -= value;
      }
    }
    setScores(updatedScores);
  }

  return (
    <div className="game-wrapper">
      <div className="game-board-wrapper">
        <GameBoard questions={questions} round={round} updateScores={updateScores} />
      </div>
      <div className="game-status-wrapper"></div>
    </div>
  );
}
