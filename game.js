const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which is the third main language of the Word Wide Web?",
    choice1: "Javascript",
    choice2: "Jewelscript",
    choice3: "Diamond Style",
    choice4: "BTML",
    answer: 1,
  },
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Text Markup Language",
    choice2: "Hyperlinks Total Madeup Language",
    choice3: "High Tail Marker Lactate",
    choice4: "Holiday Tootbrush Made Lounge",
    answer: 1,
  },
  {
    question: "Who sets the Web standards?",
    choice1: "Google",
    choice2: "Microsoft",
    choice3: "Amazon",
    choice4: "The World Wide Web Consortium",
    answer: 4,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<js>",
    choice2: "<scripting>",
    choice3: "<script>",
    choice4: "<javascript>",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

// function to start game
startGame = () => {
  questionCounter = 0;
  score = 0;
  // source all the questions from the questions array
  availableQuestions = [...questions];
  // call my get new question function
  getNewQuestion();
};

// Function with most of the magic
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

// iterate through the choices
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// function to increment the score
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();