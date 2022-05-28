// variable to access html elements
// querySelector method lets you retrieve an element from CSS selector
// using getElementById method, will only select and elemtn by IDs.
var scores = document.querySelector("#score");
var timer = document.querySelector("#timer");
var container = document.querySelector("container");
var title = document.querySelector("#title");
var content = document.querySelector("#content")
var start = document.querySelector("#startbtn")
var answer = document.querySelector("#answer")


// Counts down the timer and ends the quiz if time is zero
function runTimer () {
  let clock = setInterval(function() {
      timeLeft--;
      timer.textContent = `Time: ${timeLeft} seconds`;
      if(timeLeft === 0) {
          clearInterval(clock);
          if(title.textContent !== "All Done.") {
              endOfQuiz();
          }
      }
  }, 1000)
}

// question format

class Question {
  constructor(question, option, answer){
    this.question = question;
    this. option = option;
    this.answer = answer;
  }
}

// variable for question loop

var optionList = [];
var currentQues = 0;
var score = 0;
var timeLeft = 60;
var isQuizOngoing = false;
var leaderboard = [];
var initials= "";
var isClearAnswer = false;
var clearAnswerCode = 0;
var isCorrect = false;

var questionList = [];

// Questions are put into questionList array
const option1 = ["1. quotes", "2. parenthesis", "3. square braces", "4. curly braces"];
const question1 = new Question("What syntax wraps around strings?", option1, "1. quotes");
questionList.push(question1);

const option2 = ["1. string", "2. number", "3. boolean", "4. all of the above"];
const question2= new Question("What data types can a function return?", option2, "4. all of the above");
questionList.push(question2);

const option3 = ["1. boolean", "2. object", "3. number", "4. string"];
const question3 = new Question("What data types can local storag accept?", option3, "4. string");
questionList.push(question3);

const option4 = ["1. local variables", "2. css selectors", "3. functions", "4. names"];
const question4 = new Question("What parameters can be passed into the query selector function?", option4, "2. css selectors");
questionList.push(question4);

const option5 = ["1. body", "2. canvas", "3. concept", "4. aside"];
const question5 = new Question("Which of the following is not an HTML tag?", option5, "3. concept");
questionList.push(question5);

const option6 = ["1. add()", "2. push()", "3. concat()", "4. none of the above"];
const question6 = new Question("Which of the following function can add an element to the end of an array?", option6, "2. push()");

// initiate function for the quiz to start

function init() {
  start.addEventListener("click", questionLoop);
  scores.addEventListener("click", showScores);
}






init();


