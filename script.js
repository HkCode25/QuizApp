const questions = [
  {
    question: "Which is the James Bond Movie?",
    answers:[
      {text: "Titanic", correct: false},
      {text: "Jaws", correct: false},
      {text: "GoldenEye", correct: true},
      {text: "Mask", correct: false},
    ]
  },
  {
    question: "Which actor played James Bond?",
    answers:[
      {text: "George Lazenby", correct: true},
      {text: "Bruce Campbell", correct: false},
      {text: "Brad Pitt", correct: false},
      {text: "Rowan Atkinson", correct: false},
    ]
  },
  {
  question: "What is the code name for James Bond?",
    answers:[
      {text: "100", correct: false},
      {text: "911", correct: false},
      {text: "007", correct: true},
      {text: "211", correct: false},
    ]
  },
  {
    question: "Who sang the song “Skyfall”?",
      answers:[
        {text: "Madonna", correct: false},
        {text: "Adele", correct: true},
        {text: "Rihanna", correct: false},
        {text: "Shirley Bassey", correct: false},
      ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
  const button = document.createElement("button");
  button.innerHTML = answer.text;
  button.classList.add("btn");
  answerButtons.appendChild(button);
  if(answer.correct){
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz()
  }
})

startQuiz();