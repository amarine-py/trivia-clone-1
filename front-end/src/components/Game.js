import { useState, useEffect } from "react";
import { fetchRandomQuestionsByNumAndRound } from "../services/gameAPI";
import GameBoard from "./GameBoard";
import GameStatusBoard from "./GameStatusBoard";
import LoadingSpinner from "./LoadingSpinner";

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [playerNames, setPlayerNames] = useState([
    "Player 1",
    "Player 2",
    "Player 3",
  ]);

  useEffect(() => {
    fetchRandomQuestionsByNumAndRound(20, round).then((data) => {
      setQuestions(data);
    });
  }, [round]);

  useEffect(() => {
    if (questions.length < 20) {
      setLoaded(false);
    } else {
      setLoaded(true);
    }
  }, [questions.length])

  function updateScores(scoreReport) {
    let updatedQuestions = questions.slice();
    for (let i = 0; i < updatedQuestions.length; i++) {
      if (updatedQuestions[i].id === scoreReport.id) {
        updatedQuestions[i].category.title = null;
        setQuestions(updatedQuestions);
      }
    }

    let updatedScores = scores.slice();
    if (scoreReport.correct >= 0) {
      updatedScores[scoreReport.correct] += scoreReport.value;
    }
    if (scoreReport.incorrect.length > 0) {
      for (let idx of scoreReport.incorrect) {
        updatedScores[idx] -= scoreReport.value;
      }
    }
    setScores(updatedScores);
    console.log(`finished updating scores: ${scores}, correct: ${scoreReport.correct}, 
    incorrect: ${scoreReport.incorrect}, value: ${scoreReport.value}, clueId: ${scoreReport.id}`);
  }

  return (
    <div className="game-wrapper">
      <>
      {loaded ? (
        <>
      <GameBoard
        questions={questions}
        round={round}
        updateScores={updateScores}
      />
      <GameStatusBoard
        playerNames={playerNames}
        scores={scores}
        round={round}
      /> 
      </>
      ) :
      (<LoadingSpinner />)}
      </>
    </div>
  );
}
