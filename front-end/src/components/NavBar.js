import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <img id="logo" src=""></img>
      <h1>Jeopardy-Style Trivia Clone</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="">New Game</Link>
          </li>
          <li>
            <Link to="">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
