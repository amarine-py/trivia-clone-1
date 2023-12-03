export default function ClueBox({ questionData, onClick }) {
  const { category } = questionData;

  function doClick() {
    onClick(questionData);
  }

  return (
    <div id="clue-box-container" className="clue-box" onClick={doClick}>
      <p className="clue-box-category">{category.title}</p>
    </div>
  );
}
