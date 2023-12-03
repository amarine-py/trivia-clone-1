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
import DebugTools from "../components/DebugTools";

export default function Game({setPlayerNames}) {
  const numQuestions = 20;
  const [unanswered, setUnanswered] = useState(numQuestions);
  const [turn, setTurn] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [winner, setWinner] = useState("");
  let playerNames = useContext(PlayerContext);
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
      // boardFillAudio.play();
    }
  }, [setRound]);

  useEffect(() => {
    setTimeout(() => {
      if (clueDataLoaded()) {
        setLoaded(true);
      } else {
        setRound(2);
        setRound(1);
      }
    }, 4000)
    
  }, [questions]);

  useEffect(() => {
    if (unanswered === 0) {
      setQuestions([]);
      setRound(round + 1);
    }
  }, [unanswered]);

  function clueDataLoaded() {
    let count = 0;
    for (let i = 0; i < numQuestions; i++) {
      if (questions[i]?.id) {
        count++;
      }
    }
    if (count === numQuestions) {
      return true;
    }
    return false;
  }

  function addDailyDoubles(num, data) {
    let numTracker = [];
    let newQuestions = data.slice();
    let randomClue;
    for (let i = 0; i < num; i++) {
      do {
        randomClue = Math.floor(Math.random() * numQuestions);
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
      {console.log(`Loaded in Game.js: ${loaded}`)}
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
              <DebugTools setRound={setRound} playerNames={playerNames} setPlayerNames={setPlayerNames}/>
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
