import { useState, useEffect, useContext } from "react";
import {
  fetchRandomQuestionsByNumAndRound,
  fetchRandomFinalJeopardyQuestion,
} from "../services/gameAPI";
import GameBoard from "../components/GameBoard";
import GameStatusBoard from "../components/GameStatusBoard";
import LoadingSpinner from "../components/LoadingSpinner";
import PlayerContext from "../context/PlayerContext";
import FinalJeopardy from "../components/FinalJeopardy";
import DeclareWinner from "../components/DeclareWinner";

export default function Game() {
  const numQuestions = 20;
  const [unanswered, setUnanswered] = useState(numQuestions);
  const [turn, setTurn] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [winner, setWinner] = useState("");
  const playerNames = useContext(PlayerContext);
  const boardFillAudio = new Audio(
    "http://localhost:3000/audio/board-fill-sound.mp3"
  );

  useEffect(() => {
    if (round === 3) {
      setLoaded(false);
      setQuestions([]);
      fetchRandomFinalJeopardyQuestion().then((data) => {
        let temp = [...data];
        setQuestions(temp);
        console.log(`Final Jeopardy question: ${temp}`);
        return;
      });
    }
    if (round < 3) {
      setQuestions([]);
      if (setLoaded) setLoaded(false);
      fetchRandomQuestionsByNumAndRound(20, round).then((data) => {
        let temp = [...data];
        setQuestions(temp);
        addDailyDoubles(round, temp);
      });
      setUnanswered(numQuestions);
      boardFillAudio.play();
    }
  }, [round]);

  useEffect(() => {
    if (questions[0]?.id) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [questions.length]);

  useEffect(() => {
    if (unanswered === 0) {
      setQuestions([]);
      setRound(round + 1);
    }
  }, [unanswered]);

  function addDailyDoubles(num, data) {
    let numTracker = [];
    let newQuestions = data.slice();
    let randomClue;
    for (let i = 0; i < num; i++) {
      do {
        randomClue = Math.floor(Math.random() * numQuestions - 1);
      } while (numTracker.includes(randomClue));
      console.log(`Random number: ${randomClue}`);
      numTracker.push(randomClue);
      newQuestions
        ? (newQuestions[randomClue].dailyDouble = true)
        : console.log("Did not work!");
    }
    setQuestions([...newQuestions]);
    for (let q of newQuestions) {
      if (q?.dailyDouble) {
        console.log(`Daily Double Q: ${q.category.title}`);
      }
    }
  }

  function updateScores(scoreReport) {
    if (scoreReport.id !== null) {
      let tempUnanswered = unanswered;
      tempUnanswered--;
      setUnanswered(tempUnanswered);
      let updatedQuestions = questions.slice();
      for (let i = 0; i < updatedQuestions.length; i++) {
        if (updatedQuestions[i].id === scoreReport.id) {
          updatedQuestions[i].category.title = null;
          setQuestions(updatedQuestions);
        }
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

  function finishGame() {
    let winner = "";
    const winnerIdx = scores.indexOf(Math.max(...scores));
    if (playerNames.length === 3) {
      winner = playerNames[winnerIdx];
    } else {
      switch (winnerIdx) {
        case 0:
          winner = "Player 1";
          break;
        case 1:
          winner = "Player 2";
          break;
        case 2:
          winner = "Player 3";
          break;
      }
    }
    setWinner(winner);
  }

  if (winner) {
    return <DeclareWinner winner={winner} />;
  }

  return (
    <div className="game-wrapper">
      {loaded && (
        <>
          {round === 3 ? (
            <FinalJeopardy
              clue={questions[0]}
              scores={scores}
              updateScores={updateScores}
              finishGame={finishGame}
            />
          ) : (
            <>
              <div className="debug-tools">
                <h1>Debug Tools</h1>
                <button onClick={() => setRound(1)}>Go to Round 1</button>
                <button onClick={() => setUnanswered(0)}>Go to Round 2</button>
                <button onClick={() => setRound(3)}>
                  Go to Final Jeopardy
                </button>
              </div>

              <GameBoard
                questions={questions}
                round={round}
                updateScores={updateScores}
                scores={scores}
                turn={turn}
              />
            </>
          )}
          <GameStatusBoard scores={scores} round={round} />
        </>
      )}
      {!loaded && <LoadingSpinner />}
    </div>
  );
}
