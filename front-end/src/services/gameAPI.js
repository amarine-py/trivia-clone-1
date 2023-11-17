const LOCAL_STORAGE_GAME_KEY = "triviaCloneGame";
const url = "https://jservice.io/api";

export async function createRandomGame() {
    const gameId = Math.floor((Math.random() * 7490) + 1);
    const response = await fetch(`${url}/clues?game_id=${gameId}`);
    if (response.status === 200) {
        return response.json();
    } else {
        console.log("Error fetching game data from API", response);
    }
}