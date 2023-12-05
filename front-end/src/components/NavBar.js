import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <img id="logo" src="./trivia-clone-1/logo.png" alt="logo" height={50} width={50}></img>
      <h1>Jeopardy-Style Trivia Clone</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register-game">New Game</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
