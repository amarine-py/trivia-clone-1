const LOCAL_STORAGE_GAME_KEY = "triviaCloneGame";
const url = "https://jservice.io/api";

export async function createRandomGame() {
    // Array to hold the return value with all clues, except final jeopardy
    const finalGameData = [];
    // Array will hold the first round clues
    let firstRound = [];
    // Array to hold Double Jeopardy clues
    let doubleJeopardy = [];
    // Fetch clues for one round
    const data = await fetchRandomRound();
    // Was the round we fetched a Double Jeopardy round?
    if (isDoubleJeopardy(data[0])) {
        // Assign existing round to Double Jeopardy
        doubleJeopardy = data;
        // Use helper method to return the first round
        firstRound = await getOtherRound(1);
    } else { // Or was it the first round?
        // Assign existing round to firstRound
        firstRound = data;
        // Use helper method to return Double Jeopardy
        doubleJeopardy = await getOtherRound(2);
    }
    // Uses helper function to fill in any missins questions (q's that had a null value)
    firstRound = await fillInMissingQuestions(firstRound, 1);
    doubleJeopardy = await fillInMissingQuestions(doubleJeopardy, 2);
    
    finalGameData.push(firstRound);
    finalGameData.push(doubleJeopardy);
    return finalGameData;
}

async function fetchRandomRound() {
    // There are 7489 game IDs in the jservice API, so we
    // need to create a random game ID within that range
    const gameId = Math.floor((Math.random() * 7490) + 1);
    // Fetch a random round
    const response = await fetch(`${url}/clues?game_id=${gameId}`);
    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        console.log("Error fetching round data from API", response);
    }
}

function isDoubleJeopardy(data) {
    // checks to see if a random game was a double jeopardy round or first round
    if (data.value === 100) {
        return false;
    } else if (data.value === 200) {
        return true;
    } else {
        console.log("Value does not match either round.")
    }
}

async function getOtherRound(round) {
    // based on the isDoubleJeopardy result, this will return the other round so you can pair them
    let data = [];
    if (round === 1) {
        while (data.length < 1 || data[0].value != 100) {
            data = await fetchRandomRound();
        }
    } else if (round === 2) {
        while (data.length < 1 || data[0].value != 200) {
            data = await fetchRandomRound();
        }
    } else {
        console.log("Error in value while executing getOtherRound(round)");
    }

    return data;
}

async function fillInMissingQuestions(questions, round) {
    // this function will filter out questions with a null value and replace with a correct number value
    let filteredQs = questions.filter((q) => q.value != null);
    let filteredRows = [];

    filteredRows.push(filteredQs.filter((q) => q.value === (100 * round)));
    filteredRows.push(filteredQs.filter((q) => q.value === (200 * round)));
    filteredRows.push(filteredQs.filter((q) => q.value === (300 * round)));
    filteredRows.push(filteredQs.filter((q) => q.value === (400 * round)));
    filteredRows.push(filteredQs.filter((q) => q.value === (500 * round)));

    for (let i = 0; i < 5; i++) {
        let qValue = ((i + 1) * 100 * round);
        while (filteredRows[i].length < 6) {
            let randomOffset = Math.floor((Math.random() * 12000) + 1);
            let data = await fetch(`${url}/clues?value=${qValue}&offset=${randomOffset}`);
            let randomQuestionData = await data.json();
            let randomNum0to99 = Math.floor((Math.random() * 99) + 1);
            let randomQuestion = randomQuestionData[randomNum0to99];
            filteredRows[i].push(randomQuestion);
        } 
    }

    return filteredRows.flat(Infinity);
}


export async function createRoundWithRandomCategories(round) {
    // returns a round with six random categories
    let results = [];
    let data;
    let filteredClues;

    for (let i = 0; i < 6; i++) {
        // call to generate random category
        data = await fetchRandomCategory();
        // call to organize the clues in category and return only one of each value
        filteredClues = await organizeCategoryClues(data, round);   
        // add organized category clues to final results 
        results.push(filteredClues);
    }
    console.log(`Here come result clues with 6 categories, organized and filtered: ${restuls}`);
    return results;

}

async function fetchRandomCategory() {
    // will fetch a random category and return all clues
    // will keep trying until random category has more than 4 clues
    let randomCatNum;
    let data;
    let results; 
    do {
        randomCatNum = Math.floor((Math.random() * 25000) + 1);
        data = await fetch(`${url}/clues?category=${randomCatNum}`);
        results = await data.json();
    } while (results.length < 5);
    
    return results;
}

async function organizeCategoryClues(clues, round) {
    // takes a set of all clues from a category and a round number
    // will return a category with only 5 clues, organized by value
    
    let results;
    let filteredByValue;
    let count;
    let randNum;
    let randClue;
    let value;
    let dailyDouble = "Daily Double!!: ";

    for (let i = 1; i < 6; i++) {
        value = i * round * 100;
        // is there at least one clue that has the value of (i * round * 100)?
        filteredByValue = clues.filter((c) => c.value === (value));
        count = filteredByValue.length;
        if (filteredByValue.length < 1) {
            // if we are missing a clue of a given value, we will grab a random clue
            // of the same value, but it will be a different category
            // because of that, we will make it a daily double!
            randClue = await fetchRandomQuestionByValue(value);
            randClue.question = dailyDouble + randClue.question;
            randClue.daily_double = true;
            results.push(randClue);
        } else {
            randNum = Math.floor((Math.random() * count));
            results.push(filteredByValue[randNum]);
        }
    }
    
    return results;
     
}

async function fetchRandomQuestionByValue(value) {
    const randomOffset = Math.floor((Math.random() * 12000) + 1);
    const data = await fetch(`${url}/clues?value=${value}&offset=${randomOffset}`);
    const clues = await data.json();
    const randomClue = Math.floor((Math.random() * clues.count) + 1);
    return clues[randomClue];

}

export async function fetchRandomQuestionsByNumAndRound(num, round) {
    let results = [];
    if (num % 5 !== 0) {
        console.log("Number of questions not divisible by number of value categories.");
        return null;
    }
    let cluesPerValue = (num / 5);
    let data;
    let randomOffset;
    let nextClue;
    let lastClue = null;
    let value;
    let clues;
    let clue;

    for (let i = 0; i < 5; i++) {
        value = (i + 1) * 100 * round;
        randomOffset = Math.floor((Math.random() * 12000) + 1); 
        data = await fetch(`${url}/clues?value=${value}&offset=${randomOffset}`);
        clues = await data.json();
        for (let j = 0; j < cluesPerValue; j++) {
            do {
                nextClue = Math.floor((Math.random() * 100) + 1);
            } while (nextClue === lastClue);
            lastClue = nextClue;
            clue = clues[nextClue];
            results.push(clue);
        }
    }

    return results;
    
}