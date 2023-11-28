import CountDownTimer from "./CountDownTimer";
import { useState } from "react";

export default function Modal( {setShowModal, clue, makeAnswerReport} ) {
    const {id, answer, question, value} = clue;
    const [showAnswer, setShowAnswer] = useState(false);

    function createAnswerReport(correct, incorrect) {
        const answerReport = {
            "correct": correct,
            "incorrect": incorrect,
            "value": value,
            "id": id
        }
        console.log(`argument correct: ${correct}, answerReport: ${answerReport}`);
        makeAnswerReport(answerReport);
        setShowModal(false);
    }

    return (<div>
        <CountDownTimer initialTime={5} />
        <h1>Hello Modal</h1>
        <p>{!showAnswer ? `${question} -- $${value}` : `${answer}`}</p>
        <button onClick={() => setShowModal(false)}>Close Modal</button>
        <button onClick={() => setShowAnswer(true)}>Show Answer</button>
        <button onClick={() => createAnswerReport(0,[])}>Player 1 Correct!</button>
        <button onClick={() => createAnswerReport(-1,[0])}>Player 1 Wrong!</button>
    </div>);
}