import { useState, useEffect, useContext } from "react";
import { fetchRandomQuestionsByNumAndRound } from "../services/gameAPI";
import GameBoard from "../components/GameBoard";
import GameStatusBoard from "../components/GameStatusBoard";
import LoadingSpinner from "../components/LoadingSpinner";
import PlayerContext from "../context/PlayerContext";

export default function Game() {
  const [turn, setTurn] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const numQuestions = 20;
  const playerNames = useContext(PlayerContext);
  const boardFillAudio = new Audio("http://localhost:3000/audio/board-fill-sound.mp3");

  useEffect(() => {
    fetchRandomQuestionsByNumAndRound(20, round).then((data) => {
      setQuestions([...data]);
      addDailyDoubles(round, data);
    });
  }, [round]);

  useEffect(() => {
    if (questions.length < 20) {
      setLoaded(false);
    } else {
      setLoaded(true);
      boardFillAudio.play();
    }
  }, [questions.length]);

  function addDailyDoubles(num, data) {
    let numTracker = [];
    let newQuestions = data.slice();
    let randomClue;
    for (let i = 0; i < num; i++) {
      do {
        randomClue = Math.floor((Math.random() * numQuestions) - 1);
      } while (numTracker.includes(randomClue));
      console.log(`Random number: ${randomClue}`);
      numTracker.push(randomClue);
      newQuestions ? (newQuestions[randomClue].dailyDouble = true) : (console.log("Did not work!"));
    }
    setQuestions([...newQuestions]);
    for (let q of newQuestions) {
      if (q.dailyDouble) {
        console.log(`Q: ${q.category.title}`)
      }
    }
  }

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
      setTurn(scoreReport.correct);
    }
    if (scoreReport.incorrect.length > 0) {
      for (let idx of scoreReport.incorrect) {
        updatedScores[idx] -= scoreReport.value;
      }
    }
    setScores(updatedScores);
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
        scores={scores}
        turn={turn}
      />
      <GameStatusBoard
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
