import { useState, useEffect } from "react";
import { createRandomGame } from "../services/gameAPI";

export default function GameBoard() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (questions.length < 1) {
            createRandomGame()
            .then((data) => {
                setQuestions(data);
            })
            .catch((err) => console.error);
        }
    }, [questions.length]);

    return (
        <div id="game-board">
            <h1>Game Board</h1>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            {questions.map((q) => { return <div key={q.id}><p>{`Question: ${q.question}`}</p></div>})}
            {console.log(questions)}
        </div>
    );
}