export default function About() {
    return (
        <div className="about-wrapper">
            <h2 className="about-heading">About Trivia Clone</h2>
            <div className="about-text">
                <p>Trivia Clone was conceived of as a project to practice my front-end coding in React.js. As such, there is no backend
                    and no state that exists outside of run time in your browser. This means that you can play a new game, but you
                    cannot join a game already in progress, even though the button is there. I hope to implement that feature in the
                    future. Neither is there a high-score feature. Again, this is a feature for future versions.
                </p>
                <p>The data all comes from <a href="https://jservice.io">jservice.io</a>, which is itself an open-source project created
                for learning purposes. jService has no affiliation with Jeopardy Inc., nor does this site. That said, a huge thanks to 
                both jService and Jeopardy, without either of whom this project would be pretty boring and a continual work in progress.
                </p>
                <p>Plenty of known issues exist, but if you'd like to log issues on my <a href="https://github.com/amarine-py/trivia-clone-1">
                    GitHub repo</a>, please feel free.  As of now, the biggest issue is that sometimes the API call for the questions fetch 
                    will fail. I have built in a reload button for that scenario so you don't lose the state of your game if it does occur.
                    I have also added a Debug Tools console for testing purposes. I left it in since you may want to jump around to different rounds 
                    or rename your players, as well.
                </p>
                <p>As I'm sure you will see, I have not made the site responsive, so it really needs to be played on a screen larger
                    than 22 inches. Otherwise, you'll have certain UI components get cut off. In addition, you'll notice that the board is not
                    laid out like a traditional Jeopardy board. Instead of being organized by category, the clues are organized by value. Each clue 
                    will have a different category, although there may be an occasional repeat. I did this because it proved quite challenging to 
                    get the data organized and cleaned up correctly when organizing by category. I hope you find this way of organizing the data a 
                    nice twist in the game.
                </p>
                <p>Anyway, please be kind. I'm a beginner. I hope you enjoy it. Thanks, Johnny Gilbert!</p>
            </div>
        </div>
    );
}