

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Commonly used data types DO NOT include",
    choice1: "<strings>",
    choice2: "<booleans>",
    choice3: "<alerts>",
    choice4: "<numbers>",
    answer: 3
  },
  {
    question:
      "The condition in an if/else statement enclosed within_______.",
    choice1: "<quotes>",
    choice2: "<curly brackets>",
    choice3: "<parentheses>",
    choice4: "<square brackets>",
    answer: 2
  },
  {
    question: " Arrays in JavaScript can be used to store________.",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "Booleans",
    choice4: "all the above",
    answer: 4
  },
  {
    question: " String values must be enclosed within _____ when being assigned to variables",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "square brackets",
    choice4: "quotes",
    answer: 4
  },
  {
    question: " A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "Javascript",
    choice2: "Terminal/bash",
    choice3: "for loops",
    choice4: "console.log",
    answer: 4
  },  
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) { 
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter+ "/" +MAX_QUESTIONS;


  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  console.log(availableQuestions);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
  
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      
    
    selectedChoice.parentElement.classList.remove(classToApply);

    getNewQuestion();
  }, 1000);

  });
});
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();
