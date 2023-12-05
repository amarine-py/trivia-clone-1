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
import ErrorMessage from "../components/ErrorMessage";

export default function Game({ setPlayerNames }) {
  const numQuestions = 20;
  const [unanswered, setUnanswered] = useState(numQuestions);
  const [turn, setTurn] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [round, setRound] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [winner, setWinner] = useState("");
  const [dailyDoublesLoaded, setDailyDoublesLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    errorTitle: null,
    errorMessage: null,
  });
  const [reload, setReload] = useState(false);
  let playerNames = useContext(PlayerContext);
  const boardFillAudio = new Audio("./audio/board-fill-sound.mp3");

  useEffect(() => {
    // if it's round 3, we go to Final Jeopardy
    setLoaded(false);
    if (round === 3) {
      setError(false);
      fetchRandomFinalJeopardyQuestion().then((data) => {
        setQuestions(data);
        setLoaded(true);
        return;
      });
    }
    // if it's not round 3, we fetch questions, set daily doubles, and load the board
    if (round < 3) {
      setError(false);
      fetchRandomQuestionsByNumAndRound(20, round).then((data) => {
        setQuestions(data);
        addDailyDoubles(round, data);
        if (clueDataLoaded(data)) {
          console.log(`Data: ${data}`);
          setLoaded(true);
        } else {
          setErrorStatus({
            errorTitle: "API Data Not Loaded",
            errorMessage:
              "The data did not load in time. Press the button below to retry.",
          });
          setError(true);
        }
      });
      setUnanswered(numQuestions);
      // boardFillAudio.play();
    }
  }, [round, reload]);

  useEffect(() => {
    // if there are no more unanswered questions, we increment the round
    if (unanswered === 0) {
      setQuestions([]);
      setLoaded(false);
      setDailyDoublesLoaded(false);
      setRound(round + 1);
    }
  }, [unanswered]);

  function doReload() {
    setError(false);
    setLoaded(false);
    setQuestions([]);
    setReload(!reload);
  }

  function clueDataLoaded(data) {
    // this function checks to make sure the questions have been fetched
    console.log(data);
    let count = 0;
    if (round === 3 && data.length === 1) {
      return true;
    }
    for (let i = 0; i < numQuestions; i++) {
      if (data.includes(undefined)) {
        console.log("Not loaded!!!");
        return false;
      } else {
        return true;
      }
    }
  }

  function addDailyDoubles(num, data) {
    // this function loads the daily doubles randomly into the board
    let numTracker = [];
    let newQuestions = data.slice();
    let randomClue;
    for (let i = 0; i < num; i++) {
      do {
        randomClue = Math.floor(Math.random() * numQuestions);
      } while (numTracker.includes(randomClue));
      numTracker.push(randomClue);
      if (newQuestions) {
        newQuestions[randomClue].dailyDouble = true;
      } else {
        setErrorStatus({
          errorTitle: "DailyDouble did not work",
          errorMessage: "Unable to load the daily double question",
        });
        setError(true);
      }
    }
    setQuestions([...newQuestions]);
    for (let q of newQuestions) {
      if (q?.dailyDouble) {
        console.log(`Daily Double: ${q.category.title}`);
        setDailyDoublesLoaded(true);
      }
    }
  }

  function updateScores(scoreReport) {
    // this function updates scores after a question
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
    // this function decides the winner after final jeopardy
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

  if (error) {
    console.log("Error");
    return (
      <ErrorMessage
        errorStatus={errorStatus}
        setRound={setRound}
        round={round}
        setError={setError}
        doReload={doReload}
      />
    );
  }

  if (winner) {
    return <DeclareWinner winner={winner} />;
  }

  return (
    <div className="game-wrapper">
      {error ? (
        <ErrorMessage
          errorStatus={errorStatus}
          setRound={setRound}
          round={round}
          setError={setError}
          reload={reload}
        />
      ) : null}
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
              <DebugTools
                setRound={setRound}
                playerNames={playerNames}
                setPlayerNames={setPlayerNames}
              />
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
