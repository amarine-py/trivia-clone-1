import StartNewGame from "./StartNewGame";
import JoinGame from "./JoinGame";

export default function Home() {
    return (
        <div id="home">
            <StartNewGame />
            <JoinGame />
        </div>
    );
}