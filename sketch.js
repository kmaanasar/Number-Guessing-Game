//setting global variables
let randnum;
let button;
let val = "";

function preload() {
  //loading the font for the screen's text
  Caprasimo = loadFont("Caprasimo-Regular.ttf");
}

function setup() {
  //creates an inputbox for the user to input their guesses
  let inp = createInput("");
  inp.position(230, 380);
  inp.size(340);
  inp.input(myInputEvent);
  //results in the computer picking a random number from 1 to 50, included
  randnum = Math.floor(Math.random() * 50) + 1;
  //creates a button in order to enter a guess
  button = createButton("Enter guess");
  button.position(360, 425);
  button.mousePressed(guessnumber);
}
//variables for the guessnumber function
let guesscount = 5;
let result = "";
//creates an array to store guesses so that it can be used later to detect if a number has already been guessed and let the player know
let prevguess = [];

function guessnumber() {
  //resets variable
  result = "";
  //replaces all spaces and returns so that backspaces aren't counted as guesses
  let guess = val.replaceAll(" ", "");
  if (val == "") return;
  //makes sure that the player can only guess if they have guesses + that their guess is only valid if it's a number
  if (guesscount > 0 && val.charCodeAt() <= 57 && val.charCodeAt() >= 48) {
    //to let the player know if they already made a guess of a certain number and whether that number is bigger or smaller than the computer's number
    //this doesn't subtract from the guess count
    if (prevguess.includes(guess) && guess > randnum && guesscount > 0) {
      result += "You already guessed that number. It is smaller.";
    } else if (prevguess.includes(guess) && guess < randnum && guesscount > 0) {
      result += "You already guessed that number. It is bigger.";
      //gives player feedback on whether the number they guessed is bigger, smaller, or equal to the computer's random chosen number
      //each guess also takes 1 away from the guess count
    } else {
      guesscount -= 1;
      if (guess > randnum && guesscount > 0) {
        result += "Nope, it is smaller!";
      }
      if (guess < randnum && guesscount > 0) {
        result += "Nope, it is bigger!";
      }
    }
    if (guess == randnum && guesscount >= 0) {
      result += "You are correct!";
    }
    //stops letting the player guess the last guess is wrong
    if (guess != randnum && guesscount <= 0) {
      result += "Sorry, that is incorrect. Better luck next time!";
    }
  }
  //adds guesses to the array prevguess so that it can check whether a guess of a certain number has already been made
  prevguess.push(guess);
}

function draw() {
  createCanvas(800, 500);
  background(147, 112, 219);
  //setting text font + other features for the game's header
  textFont(Caprasimo);
  stroke(0, 0, 0);
  fill(128, 0, 128);
  textSize(45);
  text("NUMBER GUESSING GAME", 87, 70);
  textSize(25);
  stroke(0, 0, 0);
  //instructions text for the game
  text("Instructions:", 60, 110);
  noStroke();
  textSize(15);
  text(
    "~ The computer will think of a random number between 1 and 50, included.",
    60,
    130
  );
  text("~ You have 5 guesses to guess what the number is.", 60, 150);
  text("~ Please click the 'Enter guess' button to make a guess.", 60, 170);
  textSize(25);
  stroke(0, 0, 0);
  text("Guesses left:", 60, 250);
  textSize(30);
  noStroke();
  text(guesscount, 240, 252);
  //All of these if statements take the result and then display them on the screen.
  //The reason for different if statements is because I wanted the phrases to all be centered, which happened at different coordinates.
  if (result == "Nope, it is smaller!") {
    stroke(0, 0, 0);
    text(result, 260, 330);
  }
  if (result == "Nope, it is bigger!") {
    stroke(0, 0, 0);
    text(result, 270, 330);
  }
  if (result == "You are correct!") {
    stroke(0, 0, 0);
    text(result, 280, 330);
  }
  if (result == "Sorry, that is incorrect. Better luck next time!") {
    stroke(0, 0, 0);
    text("Sorry, that is incorrect.", 223, 320);
    text("Better luck next time!", 235, 350);
  }
  if (result == "You already guessed that number. It is smaller.") {
    stroke(0, 0, 0);
    text("You already guessed that number.", 150, 320);
    text("It is smaller.", 310, 350);
  }
  if (result == "You already guessed that number. It is bigger.") {
    stroke(0, 0, 0);
    text("You already guessed that number.", 150, 320);
    text("It is bigger.", 310, 350);
  }
}

function myInputEvent() {
  val = this.value();
  //takes the user's input and assigns it to a variable that I can use in the guessnumber function
}
