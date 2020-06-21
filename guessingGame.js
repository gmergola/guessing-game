/**guessingGame: returns a function guessNum which takes a number and returns
 * a response depending on if the number entered into the function matched the
 * randomly picked number in guessingGame.
 */

 /**TODO: add typescript to ensure a number is guessed */
function guessingGame() {
  let array99 = [...Array(99).keys()]
  let randomNum = Math.floor(Math.random() * array99.length);
  let guessCount = 0;
  let response;

  return function guessNum(num) {
    progressBar(randomNum);
    /***console.log is for testing***/
    console.log('random', randomNum);
    guessCount++;
    if (response === 'WINNER') return "The game is over, you already won!";
    if (+num > randomNum) return `You guessed ${num} that is too high`;
    if (+num < randomNum) return `You guessed ${num} that is too low`;
    if (+num === randomNum) {
      response = 'WINNER';
      show(document.getElementById('winner-image'));
      return `YOU WIN the game! You found ${randomNum} in ${guessCount} guesses.`
    }
  }
}

/**show: shows elements that are initially hidden */
function show (element) {
	element.style.display = 'block';
};
function clear (element) {
	element.innerText = '';
};
function hide (element) {
	element.style.display = 'none';
};

let guessGame;

/**saveRandomNum:  calls guessingGame order to choose a new random number
 * for the user to guess and sets the function returned to the guessGame variable
 * */
function saveRandomNum() {
  guessGame = guessingGame();
  hide(document.getElementById('winner-image'));
  clear(document.getElementById("guess"));
  clear(document.getElementById("recorded-guesses"))
  clear(document.getElementById("progressBar"));
  show(document.getElementById("container"));
  document.getElementById("the-form").reset();
}

/**addGuessResultToPage: get's the returned string from guessGame
 * and appends that to the page
 */
function addGuessResultToPage(evt) {
  evt.preventDefault();
  clear(document.getElementById("progressBar"));

  let response = guessGame(document.getElementById("user-guess").value);
  document.getElementById("guess").innerText = response;

  let recordedGuessesDiv = document.createElement('div');
  recordedGuessesDiv.appendChild(document.createTextNode(`${response}`));
  document.getElementById("recorded-guesses").appendChild(recordedGuessesDiv);

  document.getElementById("the-form").reset();
}

/**progressBar: compares randomNum to the user's guess
 * and adds to or subtracts the progress bar depending on
 * how far the guess is from randomNum
 * */
function progressBar (randomNum) {
  let guessedNum = +document.getElementById("user-guess").value;
  let difference;
  let greenSquare;

  if (randomNum > guessedNum) {
    difference = randomNum - guessedNum;
  }else {
    difference = guessedNum - randomNum;
  }

  for(let i = 1; i <= (99 - difference); i++) {
    greenSquare = document.createElement('div');
    greenSquare.classList.add('greenSquare');
    document.getElementById("progressBar").appendChild(greenSquare);
  }
}

/**On page load activate buttons */
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('guess-button').addEventListener("click", addGuessResultToPage);
  document.getElementById('start-game').addEventListener("click", saveRandomNum);
});
