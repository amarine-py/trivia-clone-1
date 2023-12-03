import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterGame({ registerPlayers }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const navigate = useNavigate();

  const register = () => {
    let playerNames = [];
    playerNames.push(player1);
    playerNames.push(player2);
    playerNames.push(player3);
    registerPlayers(playerNames);
    console.log(playerNames);
    navigate("/new-game");
  };

  return (
    <div className="register-wrapper">
      <div className="register-title">Please enter names of players</div>
      <div className="register-form">
        <div className="register1">
          <label htmlFor="label">Player 1</label>
          <input
            type="text"
            className="register-input"
            id="player1"
            name="player1"
            onChange={(evt) => setPlayer1(evt.target.value)}
            required
          />
        </div>
        <div className="register2">
          <label htmlFor="label">Player 2</label>
          <input
            type="text"
            className="register-input"
            id="player2"
            name="player2"
            onChange={(evt) => setPlayer2(evt.target.value)}
            required
          />
        </div>
        <div className="register3">
          <label htmlFor="label">Player 3</label>
          <input
            type="text"
            className="register-input"
            id="player3"
            name="player3"
            onChange={(evt) => setPlayer3(evt.target.value)}
            required
          />
        </div>
      </div>
      <div className="register-button">
        <button onClick={register}>Start New Game</button>
      </div>
    </div>
  );
}
