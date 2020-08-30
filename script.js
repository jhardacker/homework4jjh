//VARIABLES
var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitButton = document.getElementById("submitButton");

var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.querySelector(".questionButton");

var quizChallengePage = document.getElementById("quizChallengePage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initialButton = document.getElementById("initialButton"); 
var initials = document.getElementById("initials"); 
var initialInput = document.getElementById("initialInput"); 

var allDone = document.getElementById("allDone");
var allDoneButtons = document.getElementById("form-inline");

var timer = document.getElementById("timer"); // Timer

// QUIZ QUESTION ARRAY
var quizQuestions = [
  {
  "quizQuestionHeader" : "What are the main ingredients in a Roux?", 
  "one" : "1. Flour and Water",
  "two" : "2. Eggs and Oil",
  "three" : "3. Butter and Flour",
  "four" : "4. Water and Oil",
  "correct" : "3. Butter and Flour",
  },{
  "quizQuestionHeader" : "Which of these is NOT a Mother Sauce?",
  "one" : "1. Espagnole",
  "two" : "2. Hollandaise",
  "three" : "3. Gravy",
  "four" : "4. Tomato ",
  "correct" : "3. Gravy",
  },{
  "quizQuestionHeader" : "What do you need to make a Ganache?",
  "one" : "1. Milk and Eggs ",
  "two" : "2. Chocolate and Eggs",
  "three" : "3. Eggs and Vanilla",
  "four" : "4. Chocolate and Heavy Cream",
  "correct" : "4. Chocolate and Heavy Cream",
  },{
   "quizQuestionHeader" : "What is Capsaicin?",
   "one" : "1. The component that makes chili peppers hot",
   "two" : "2. The pigment that makes egg yolks yellow",
   "three" : "3. The raw ingredient that chocolate is made from",
   "four" : "4. The taste receptor that registers sweetness on our tongues",
   "correct" : "1. The component that makes chili peppers hot",
  },{
   "quizQuestionHeader" : "What do you need in order to make Bread Dough Rise?",
   "one" : "1. Eggs",
   "two" : "2. Sugar",
   "three" : "3. Salt",
   "four" : "4. Yeast",
   "correct" : "4. Yeast",
  },
]

var startScore = 0; 
var questionIndex = 0;

// FIRST PAGE 
function codeQuizChallenge() {
  quizChallengePage.style.display = "block";  
  header.style.display = "block"; 
  quizQuestionsPage.style.display = "none"; 
  finalScorePage.style.display = "none";    

  var startScore = 0; 
  timer.textContent = "Time: " + startScore; 
}

function resetVariables() {
  startScore = 0; 
  questionIndex = 0;
}

function startQuiz() { 
quizChallengePage.style.display = "none"; 
quizQuestionsPage.style.display = "block"; 

secondsLeft = 80; // Timer 

  var timerInterval = setInterval(function() { 
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
}

// QUESTIONS
function showQuestions() {
  var q = quizQuestions[questionIndex];

  quizQuestionHeader.innerHTML = q.quizQuestionHeader;
  choice1.innerHTML = q.one;
  choice1.setAttribute("data-answer", q.one);
  choice2.innerHTML = q.two;
  choice2.setAttribute("data-answer", q.two);
  choice3.innerHTML = q.three;
  choice3.setAttribute("data-answer", q.three);
  choice4.innerHTML = q.four;
  choice4.setAttribute("data-answer", q.four);
}

// EVENT LISTENERS
showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})

function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  answerResponse.textContent = "Correct!"; 
  } else {
  answerResponse.textContent = "Wrong!"; 
      secondsLeft -= 10
      if (secondsLeft < 0) {
          secondsLeft = 0;
      }
  }
  if (quizQuestions.length === questionIndex+1) {
    showFinalScore(); 
    return; 
  }
  questionIndex++;
  showQuestions();
}


function showFinalScore() { 
  quizQuestionsPage.style.display = "none"; 
  highScoreButtons.style.display = "none"; 
  finalScorePage.style.display = "block"; 
  finalScoreIs.style.display = "block" 
  initials.style.display = "block" 
  initialButton.style.display = "block" 
  initialInput.style.display = "block" 

    finalScoreIs.textContent = "Your final score is " + secondsLeft;
    initialButton.textContent = "Submit"; 
    initials.textContent = "Enter Your Initials: "; 
} 

var highScoreArray = [] 

//HIGH SCORES 
function showHighScores() {
  header.style.display = "none"; 
  allDone.style.display = "none"; 
  finalScoreIs.style.display = "none" 
  initials.style.display = "none" 
  initialButton.style.display = "none" 
  initialInput.style.display = "none" 
  highScoreButtons.style.display = "block"; 
  
  var getInitials = document.getElementById("initialInput").value; 

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); 

  var highScores = getInitials + ": " + secondsLeft; 

  $("#highScoreList").append(highScores) 
}


submitButton.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})

score.addEventListener("click", function() {
  showHighScores();
  console.log("view high scores")
})

initialButton.addEventListener("click", function() { 
  showHighScores();
  console.log("initial button")
}) 


clearHighScore.addEventListener("click", function() {
  localStorage.clear();
})


goBack.addEventListener("click", function() { 
  $("#highScoreList").empty() 
  $("#initialInput").val("") 
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})

codeQuizChallenge();  