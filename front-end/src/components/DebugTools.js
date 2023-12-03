import { useContext } from "react";
import PlayerContext from "../context/PlayerContext";

export default function DebugTools({ setRound, playerNames, setPlayerNames }) {
  let player1 = playerNames[0];
  let player2 = playerNames[1];
  let player3 = playerNames[2];
  const inputStyle = {
    color: "white",
    fontSize: "20px",
    marginTop: "20px",
  };

  return (
    <div className="debug-tools">
      <h1>Debug Tools</h1>
      <button onClick={() => setRound(1)}>Go to Round 1</button>
      <button onClick={() => setRound(2)}>Go to Round 2</button>
      <button onClick={() => setRound(3)}>Go to Final Jeopardy</button>
      <label style={inputStyle}>Rename Player 1:</label>
      <input
        type="text"
        id="player1"
        name="player1"
        value={playerNames[0]}
        onChange={(evt) => setPlayerNames([evt.target.value, player2, player3])}
      />
      <label style={inputStyle}>Rename Player 2:</label>
      <input
        type="text"
        id="player2"
        name="player2"
        value={playerNames[1]}
        onChange={(evt) => setPlayerNames([player1, evt.target.value, player3])}
      />
      <label style={inputStyle}>Rename Player 3:</label>
      <input
        type="text"
        id="player3"
        name="player3"
        value={playerNames[2]}
        onChange={(evt) => setPlayerNames([player1, player2, evt.target.value])}
      />
    </div>
  );
}
