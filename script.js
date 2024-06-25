// List of Quiz Questions and Answers
const questions = [
  {
    question: "What does the Quran state about the motion of the sun?",

    answers: [
      { text: "The Quran says the sun is stationary", correct: false },
      {
        text: "The Quran says only the moon rotates in its own axis and not the sun",
        correct: false,
      },
      {
        text: "The Quran says that the sun, moon and all celestial bodies rotate in their own axis",
        correct: true,
      },
      {
        text: "There are no verses in the Quran talking about the sun",
        correct: false,
      },
    ],
  },
  {
    question: "The Islamic calendar is based on which of the following cycles?",
    answers: [
      { text: "Solar", correct: false },
      { text: "Lunar", correct: true },
      { text: "Both sonar and lunar", correct: false },
      { text: "None of above", correct: false },
    ],
  },
  {
    question: "In which month was the Quran revealed?",
    answers: [
      { text: "Rabi-ul-Awwal", correct: false },
      { text: "Muharram", correct: false },
      { text: "Shaaban", correct: false },
      { text: "Ramadhan", correct: true },
    ],
  },
  {
    question: "How many days does an Islamic month consist of?",
    answers: [
      { text: "28 or 29 days", correct: false },
      { text: "29 or 30 days", correct: true },
      { text: "30 or 31 days", correct: false },
      { text: "365 days", correct: false },
    ],
  },

  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Blue Whale", correct: true },
    ],
  },
];

// DOM Elements for Question Display and Answer Buttons
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables to Track Current Question Index and Score
let currentQuestionIndex = 0;
let score = 0;

// Function to Start the Quiz
function startQuiz() {
  currentQuestionIndex = 0; // Reset the question index to the first question
  score = 0; // Reset the score
  nextButton.innerHTML = "Next";
  showQuestion(); // Display the first question
}

// Function to Display the Current Question and Answer Options
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex]; // Get the current question based on index
  let questionNo = currentQuestionIndex + 1; // Calculate the question number for display
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question text

  // Create and display buttons for each answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // Create a new button element
    button.innerHTML = answer.text; // Set the button text to the answer option
    button.classList.add("btn"); // Add the "btn" class to the button for styling
    answerButtons.appendChild(button); // Add click event to handle answer selection
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectButton = e.target;
  const isCorrect = selectButton.dataset.correct === "true";
  if (isCorrect) {
    selectButton.classList.add("correct");
  } else {
    selectButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      score++;
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!  `;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
