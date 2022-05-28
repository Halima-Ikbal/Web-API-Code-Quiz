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

// question format

class Question {
  constructor(question, option, answer){
    this.question = question;
    this. option = option;
    this.answer = answer;
  }
}

var questionList = [];

// Questions are put into questionList array

