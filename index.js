// Your code here
var questionsArr = [
  {
    question: 'Which Avenger is the only one who could calm the Hulk down?',
    answer: 'Black Widow',
    options: [
      'Iron Man',
      'Black Widow',
      'Thor',
      'Romanova',
    ]
  },
  {
    question: "What was Superman’s birth name?",
    answer: "Kal-El",
    options: [
      "Heiner",
      "Olympia",
      "Kal-El",
      "Apollo"
    ]
  },
  {
    question: "Aquaman is from which city under the sea?",
    answer: "Atlantis",
    options: [
      "Atlantis",
      "Dwarka",
      "Lion City",
      "Port Royal"
    ]
  },
  {
    question: "Who is Green Lantern’s nemesis?",
    answer: "Sinestro",
    options: [
      "Joker",
      "Sinestro",
      "Riddler",
      "Bane"
    ]
  },
  {
    question: "What is the name of Batman’s butler?",
    answer: "Alfred",
    options: [
      "Alfred",
      "Benson",
      "Charles",
      "Domovoi"
    ]
  }
];

function start() {
  var quizElement = document.getElementById("quiz");
  var timerElement = document.createElement("p");
  var questionEl = document.createElement("p");
  var optionsContainer = document.createElement("div");
  var scoreEl = document.createElement("p");
  var startButton = document.createElement("button");
  startButton.id = "start-quiz";
  var questionIndex = 0;
  var timerTime = 0;
  var timer;
  var score = 0;
  
  function displayQuestion() {
    var currentQuestion = questionsArr[questionIndex];
    
    questionEl.innerText = currentQuestion.question;
    quizElement.appendChild(questionEl);
    
    optionsContainer.innerHTML = "";
    for (var i in currentQuestion.options) {
      var currentOption = currentQuestion.options[i];
      
      var optionButton = document.createElement("button");
      optionButton.innerText = currentOption;
      optionButton.addEventListener("click", (e) => {
        submitOption(e.target.innerText);
      });
      optionsContainer.appendChild(optionButton);
    }
    quizElement.appendChild(optionsContainer);
    
    timerElement;
    quizElement.appendChild(timerElement);
  }
  
  function updatePreviousScore(newPreviousScore) {
    scoreEl.innerText = "Previous Score: " + newPreviousScore + "%"
    quizElement.appendChild(scoreEl);
  }
  
  function endQuiz() {
    quizElement.innerHTML = "";
    var previousScore = Math.floor(score / questionsArr.length * 100);
    localStorage.setItem("previous-score", previousScore);
    updatePreviousScore(previousScore);
    quizElement.appendChild(startButton);
    score = 0;
    clearInterval(timer);
  }
  
  function submitOption(optionText) {
    var currentQuestion = questionsArr[questionIndex];
    if (currentQuestion.answer === optionText) {
      score++;
    }
    nextQuestion();
  }
  
  function nextQuestion() {
    questionIndex++;
    if (questionIndex >= questionsArr.length) {
      endQuiz();
    } else {
      timerTime = 30;
      updateTimer();
      displayQuestion();
    }
  }
  
  function updateTimer() {
    timerElement.innerText = timerTime;
  }
  
  function tickTimer() {
    timerTime--;
    if (timerTime <= 0) {
      nextQuestion();
    }
    updateTimer();
  }
  
  function startTimer() {
    timerTime = 30;
    updateTimer();
    timer = setInterval(tickTimer, 1000);
  }
  
  startButton.id = "start-quiz";
  startButton.innerText = "Start Quiz!";
  startButton.addEventListener("click", () => {
    quizElement.innerHTML = "";
    questionIndex = 0;
    displayQuestion();
    startTimer();
  })
  var previousScore = localStorage.getItem("previous-score");
  if (previousScore) {
    updatePreviousScore(previousScore);
  }
  quizElement.appendChild(startButton);
}

start();