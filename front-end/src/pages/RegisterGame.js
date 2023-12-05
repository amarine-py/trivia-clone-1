import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterGame({ registerPlayers }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player3, setPlayer3] = useState("");
  const navigate = useNavigate();

  const register = () => {
    let playerNames = [];
    playerNames.push(player1 ? player1 : "Player 1");
    playerNames.push(player2 ? player2 : "Player 2");
    playerNames.push(player3 ? player3 : "Player 3");
    registerPlayers(playerNames);
    console.log(playerNames);
    navigate("/new-game");
  };

  const onChange = (evt, player) => {
    let name;
    if (evt.target.value === "") {
      name = `Player ${player + 1}`;
    } else {
      name = evt.target.value;
    }
    if (player === 0) {
      setPlayer1(name);
    } else if (player === 1) {
      setPlayer2(name);
    } else if (player === 2) {
      setPlayer3(name);
    }
    console.log([player1, player2, player3])
  }

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
            onChange={(evt) => onChange(evt, 0)}
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
            onChange={(evt) => onChange(evt, 1)}
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
            onChange={(evt) => onChange(evt, 2)}
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
