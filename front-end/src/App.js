import NavBar from "./components/NavBar";
import Home from "./components/Home";
import StartNewGame from "./components/StartNewGame";
import JoinGame from "./components/JoinGame";
import GameBoard from "./components/GameBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<GameBoard />} />
      </Routes>
      </div>
  );
}

export default App;
