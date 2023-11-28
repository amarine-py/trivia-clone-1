import StartNewGame from "./StartNewGame";
import JoinGame from "./JoinGame";

export default function Home() {
  return (
    <div id="home-wrapper">
      <div id="home">
        <StartNewGame />
        <JoinGame />
      </div>
    </div>
  );
}
