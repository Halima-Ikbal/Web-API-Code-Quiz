// JavaScript file for 04-Web-APIs-Challenge
// Variables to access html elements
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var main = document.querySelector("#main");
var title = document.querySelector("#title");
var content = document.querySelector("#content");
var startbtnbtn = document.querySelector("#startbtnbtn");
var answer = document.querySelector("#answer");

// Structure of questions
class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

var questionList = [];

// All Questions formatted and put into questionList array
const options1 = ["1. boolean", "2. object", "3. number", "4. string"];
const question1 = new Question("What data types can local storage accept?", options1, "4. string");
questionList.push(question1);

const options2 = ["1. string", "2. number", "3. boolean", "4. all of the above"];
const question2 = new Question("What data types can a function return?", options2, "4. all of the above");
questionList.push(question2);

const options3 = ["1. local variables", "2. css selectors", "3. functions", "4. names"];
const question3 = new Question("What parameters can be passed into the query selector function?", options3, "2. css selectors");
questionList.push(question3);

const options4 = ["1. body", "2. canvas", "3. concept", "4. aside"];
const question4 = new Question("Which of the following is not an HTML tag?", options4, "3. concept");
questionList.push(question4);

const options5 = ["1. add()", "2. push()", "3. concat()", "4. none of the above"];
const question5 = new Question("Which of the following functions can add an element to the end of an array? ", options5, "2. push()");
questionList.push(question5);

const options6 = ["1. quotes", "2. curly braces", "3. parenthesis", "4. square braces"];
const question6 = new Question("What syntax wraps around strings?", options6, "1. quotes");
questionList.push(question6);

// Variables for question loop functions
var optionList = [];
var currentQues = 0;
var score = 0;
var timeLeft = 61;
var isQuizOngoing = false;
var leaderboard = [];
var initials = "";
var isClearingAnswer = false;
var clearingAnswerCode = 0;
var isCorrect = false;

// Init function that makes view scores and startbtnbtn quiz clickable
function init() {
    startbtn.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);
}

// Makes elements before the quiz startbtned invisible and creates option buttons
function questionLoop () {
    runTimer();
    isQuizOngoing = true;
    startbtn.setAttribute("style", "display: none");
    content.setAttribute("style", "display: none");
    var numOfOptions = questionList[0].options.length;
    for(var i = 0; i < numOfOptions; i++) {
        var option = document.createElement("button");
        main.appendChild(option);
        optionList.push(option);
        option.setAttribute("id", `button${i + 1}`);
    }
    nextQuestion();
}

// Counts down the timer and ends the quiz if time is zero
function runTimer () {
    var clock = setInterval(function() {
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


// Checks for the last question
// Either goes to next question or end of quiz
function nextQuestion(event) {
    writeAnswer(event);
    if(currentQues < questionList.length) {
        changeQuestion();
    } else {
        endOfQuiz();
    }
}


// Checks the first question 
// if not it checks the answer from the previous question is correct
//Timer is set to zero if is less than 10 sec
function writeAnswer(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questionList[currentQues - 1].answer) {
            isCorrect = true;
            answer.textContent = "Correct";
            answer.setAttribute("style", "color: gray");
            score += 10;
        } else {
            isCorrect = false;
            answer.textContent = "Incorrect";
            answer.setAttribute("style", "color: gray");
            if(timeLeft > 10) {
                timeLeft -= 10;
            } else {
                timeLeft = 1;
            }
            timer.setAttribute("style", "color: red");
            setTimeout(function () {
                timer.setAttribute("style", "color: black");
            },1000);
        }
        clearAnswer();
    }
}

// Clears the the content in the footer after three seconds
// Checks if a timeout has already been set
// If it has it clears the previous timeout and calls itself
function clearAnswer() {
    if(isClearingAnswer) {
        isClearingAnswer = false;
        clearTimeout(clearingAnswerCode);
        clearAnswer();
    } else {
        isClearingAnswer = true;
        clearingAnswerCode = setTimeout(function() {
            answer.textContent = "";
            isClearingAnswer = false;
        }, 3000);
    }
}

// Changes the title to the next question
// Changes the options for each button
function changeQuestion() {
    title.textContent = questionList[currentQues].question;
    for(var i = 0; i < questionList[currentQues].options.length; i++) {
        optionList[i].textContent = questionList[currentQues].options[i];        
        optionList[i].addEventListener("click", nextQuestion);
    }
    currentQues++;
}

// Changes title to All Done, clears options and displays score
// Sets current question and score to zero and creates input fields
function endOfQuiz() {
    title.textContent = "All Done.";
    timeLeft = 1;
    clearOptions();
    clearAnswer();
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;
    inputFields();
}

//Removes option buttons and empties array they were in
function clearOptions() {
    for(var i = 0; i < optionList.length; i++) {
        optionList[i].remove();
    }
    optionList = [];
}

// Creates the form for entering initials
// Listens for click on submit 
function inputFields() {
    var initialsForm = document.createElement("form");
    main.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    var label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Enter initials: "
    var input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "initials");
    var submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    title.setAttribute("style", "align-self: startbtn")
    content.setAttribute("style", "align-self: startbtn; font-size: 150%");

    
    input.addEventListener("keydown", stopReload);
    submit.addEventListener("click", addScore);
    
}

// Prevents entry field from reloading page
function stopReload(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}

// Prevents submit from reloading page
// Checks if initials are in a valid format
// vars program now quiz is over and removes the form
// Saves the score
function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    var id = document.getElementById("initials");
    if(id.value.length > 3 || id.value.length === 0) {
        invalidInput();
        return;
    }
    isQuizOngoing = false;
    document.getElementById("form").remove();
    saveScore(id);
}

// Chacks if there are any scores saved locally
// If there are is populates them in an array
// Adds the score to the array and updates local storage
function saveScore(id) {
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.push(`${score} ${id.value}`);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showScores();    
}

// If an incorrect input is given a message is displayed
// Sets the submit button to listen for click
function invalidInput() {
    answer.textContent = "Initials must be entered";
    answer.setAttribute("style", "color: black");
    clearAnswer();
    var submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}

// Checks if quiz is ongoing to prevent being able to check scores during quiz
// Displays a message is quiz is ongoing.
// Changes title, writes scores and creates buttons for navigation
function showScores() {
    if(!isQuizOngoing) {
        title.textContent = "High Scores";
        // Hides startbtn quiz button if view high scores is clicked at beginning
        startbtn.setAttribute("style", "display: none");
        writeScores();
        createEndButtons();
    } else if(title.textContent === "All Done.") {
        answer.textContent = "Please enter your initials first";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    } else {
        answer.textContent = "Cannot view scores until the quiz is over";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    }
}

// Empties content box and formats for list
// Chacks if any scores are stored
// If there are they are put into an array
// The array is sorted to display the top score
// the contents of the array are printed through a loop
function writeScores() {
    content.textContent = "";
    content.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.sort();
    leaderboard.reverse();
    var limit = 11;
    if(limit > leaderboard.length) {
        limit = leaderboard.length;
    }
    for(var i = 0; i < limit; i++) {
        content.textContent += leaderboard[i] + '\n';
    }
}

// Checks to see if the buttons have been created already
// Creates the buttons and sets listeners for a click
function createEndButtons() {
    if(!document.getElementById("restartbtn")) {
        var restartbtnVar = document.createElement("button");
        main.appendChild(restartbtnVar);
        restartbtnVar.textContent = "Go Back";
        restartbtnVar.setAttribute("id", "restartbtn");
        
        var clearScoresVar = document.createElement("button");
        main.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");
        
        restartbtnVar.addEventListener("click", restartbtn);
        clearScoresVar.addEventListener("click", clearScores)
    }
}

// Removes the current buttons on the screen
// Sets the title and content to original
// Makes startbtn button visible, resets variables and runs init function
function restartbtn() {
    title.setAttribute("style", "align-self: center");
    content.setAttribute("style", "align-self: center; font-size: 110%");
    document.getElementById("restartbtn").remove();
    document.getElementById("clearScores").remove();
    title.textContent = "Coding Quiz";
    content.textContent = "Try to answer the following code-related questions. 10 sec will be subtract for every wrong answer.";
    startbtn.setAttribute("style", "display: visible");
    currentQues = 0;
    score = 0;
    timeLeft = 61;
    init();
}

// Clears local storage and array holding scores
// Erases content area
function clearScores() {
    localStorage.clear();
    content.textContent = "";
    leaderboard = [];
}

init();











