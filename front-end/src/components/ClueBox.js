import { useState } from "react";

export default function ClueBox({questionData, onClick}) {
  const [clicked, setClicked] = useState(false);
  const { question, answer, category, value } = questionData;

  function doClick() {
    console.log("do click");
    onClick(questionData);
  }

  return (
    <div id="clue-box-container" className="clue-box" onClick={doClick}>
      {!clicked ? (
        <p className="clue-box-category">{category.title}</p>
      ) : (
        <p className="clue-box-clicked">Nothing</p>
      )}
    </div>
  );
}
