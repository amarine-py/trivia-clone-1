const url = "https://jservice.io/api";

async function fetchRandomQuestionByValue(value) {
  const randomOffset = Math.floor(Math.random() * 12000 + 1);
  const data = await fetch(
    `${url}/clues?value=${value}&offset=${randomOffset}`
  );
  const clues = await data.json();
  const randomClue = Math.floor(Math.random() * clues.count + 1);
  return clues[randomClue];
}

export async function fetchRandomFinalJeopardyQuestion() {
  let data = await fetch(`${url}/final`);
  let result = await data.json();
  return await result;
}

export async function fetchRandomQuestionsByNumAndRound(num, round) {
  let results = Array(num).fill({});
  if (num % 5 !== 0) {
    console.log(
      "Number of questions not divisible by number of value categories."
    );
    return null;
  }
  let cluesPerValue = num / 5;
  let data;
  let randomOffset;
  let randClueNum;
  let value;
  let clues;
  let clue;
  let idTracker = [];

  for (let i = 0; i < 5; i++) {
    value = (i + 1) * 100 * round;
    randomOffset = Math.floor(Math.random() * 12000 + 1);
    data = await fetch(`${url}/clues?value=${value}&offset=${randomOffset}`);
    clues = await data.json();
    for (let j = 0; j < cluesPerValue; j++) {
      let idx = j * 5 + i;
      do {
        randClueNum = Math.floor(Math.random() * 100 + 1);
      } while (isAlreadyInResults(randClueNum, idTracker));
      idTracker.push(randClueNum);
      clue = await clues[randClueNum];
      results[idx] = clue;
    }
  }
  return results;
}

function isAlreadyInResults(id, idArr) {
  if (idArr.length < 1) {
    return false;
  }
  if (idArr.includes(id)) {
    return true;
  }
  return false;
}
