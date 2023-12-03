import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Game from "./pages/Game";
import RegisterGame from "./pages/RegisterGame";
import PlayerContext from "./context/PlayerContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const registerPlayers = (names) => {
    const players = [...names];
    setPlayerNames(players);
  };

  return (
    <PlayerContext.Provider value={playerNames}>
      <div className="app-start">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register-game"
            element={<RegisterGame registerPlayers={registerPlayers} />}
          />
          <Route
            path="/new-game"
            element={<Game setPlayerNames={setPlayerNames} />}
          />
        </Routes>
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
