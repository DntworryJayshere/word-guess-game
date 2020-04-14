//Global Variables
//=================================================================

//arrays and variables
var wordBank = ["pepper", "squash", "basil", "chile", "tomato", "cucumber", "lufa", "okra"]
var currentWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var alreadyGuessedWrong = [];
var alreadyGuessedRight = [];

//game counters
var winCount = 0;
var lossCount = 0;
var remainingGuesses = 12;

//functions
//=================================================================
function startGame() {
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    lettersInWord = currentWord.split("");
    numBlanks = lettersInWord.length;

    //reset
    remainingGuesses = 12;
    blanksAndSuccesses = [];
    alreadyGuessedWrong = [];
    alreadyGuessedRight = [];

    //populate blanks and successes with appropriate numbers
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    //change html to reflect game round conditions
    document.getElementById("currentWord-Text").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses-Text").innerHTML = alreadyGuessedWrong.join(" ");
    document.getElementById("numGuesses-Text").innerHTML = remainingGuesses;
    document.getElementById("winCounter-Text").innerHTML = winCount;
    document.getElementById("lossCounter-Text").innerHTML = lossCount;

}

function checkLetters(letter) {
    //check if a letter exists in word
    var isLetterInWord = false;
    var isLetterInGuessedWrong = false;
    var isLetterInGuessedRight = false;

    for (var i = 0; i < numBlanks; i++) {
        if (currentWord[i] == letter) {
            isLetterInWord = true;
        }
    }
    for (var i = 0; i < alreadyGuessedWrong.length; i++) {
        if (alreadyGuessedWrong[i] == letter) {
            isLetterInGuessedWrong = true;
        }
    }
    for (var i = 0; i < alreadyGuessedRight.length; i++) {
        if (alreadyGuessedRight[i] == letter) {
            isLetterInGuessedRight = true;
        }
    }

    //check where letter exists in word
    if (isLetterInWord && !isLetterInGuessedRight) {
        for (var i = 0; i < numBlanks; i++) {
            if (currentWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
        alreadyGuessedRight.push(letter);
    }
    else if (isLetterInGuessedRight && !isLetterInGuessedWrong) {
        alert("That letter has already been guessed!")
    }
    else if (!isLetterInGuessedWrong) {
        alreadyGuessedWrong.push(letter);
        remainingGuesses--;
    }
    else {
        alert("That letter has already been guessed!")
    }

}


function roundComplete() {
    console.log("Win Count: " + winCount + "| Loss Count" + lossCount + "| Guesses Left" + remainingGuesses)
    document.getElementById("numGuesses-Text").innerHTML = remainingGuesses;
    document.getElementById("currentWord-Text").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses-Text").innerHTML = alreadyGuessedWrong.join(" ");

    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");
        document.getElementById("winCounter-Text").innerHTML = winCount;
        startGame();
    }
    else if (remainingGuesses == 0) {
        lossCount++;
        alert("You Lost!");
        document.getElementById("lossCounter-Text").innerHTML = lossCount;
        startGame();
    }

}

//Main Process
//=================================================================

startGame();

document.onkeyup = function (event) {
    var letterGuessed = event.key.toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
}
