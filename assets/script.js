var startEl = document.getElementById('start-container');
var questionsEl = document.getElementById('questions-container');
var endEl = document.getElementById('end-container');
var highscoresEl = document.getElementById('high-scores-container');
var viewScoresEl = document.getElementById('view-scores');
var timerEl = document.getElementById('timer');
var startBtnEl = document.getElementById('start-quiz');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('btn-answers');
var scoreEl = document.getElementById('score');
var initialsFormEl = document.getElementById('initials-form');
var initialsEl = document.getElementById('initials');
var submitBtnEl = document.getElementById('submit-score');
var scoreboardEl = document.getElementById('scoreboard');
var restartBtnEl = document.getElementById('restart');
var clearBtnEl = document.getElementById('clear-scores');
var correctEl = document.getElementById('correct');
var incorrectEl = document.getElementById('incorrect');

var timeLeft;
var gameover;
var score = 0;
var highScores = [];

timerEl.innerText = 0;

var questionsArray;
var questionNumber = 0;

var quizQuestions = [
    {Q: 'Which coding tool is responsible for the structure of a webpage?', A: '2. HTML', choices: [{choice: '1. CSS'}, {choice: '2. HTML'}, {choice: '3. JQuery'}, {choice: '4. JavaScript'}]},
    {Q: 'How do you grab in element without needing to use a hashtag (#) in JavaScript?', A: '4. getElementByID', choices: [{choice: '1. className'}, {choice: '2. addID'}, {choice: '3. setElementByID'}, {choice: '4. getElementByID'}]},
    {Q: 'Which notation should you use if you want to make an if statement where the condition is "equals to"?', A: '4. ===', choices: [{choice: '1. all of the below'}, {choice: '2. ='}, {choice: '3. =='}, {choice: '4. ==='}]},
    {Q: 'What element is used to apply CSS files to HTML documents?', A: '1. <link>', choices: [{choice: '1. <link>'}, {choice: '2. <script>'}, {choice: '3. <meta>'}, {choice: '4. <css>'}]},
    {Q: 'Is coding fun?', A: '3. YES!!!', choices: [{choice: '1. No'}, {choice: '2. Meh'}, {choice: '3. YES!!!'}, {choice: '4. Only on Thursdays'}]}
];

var renderCodeQuiz = function () {
    startEl.classList.remove('hidden');
    startEl.classList.add('reveal');
    
    highscoresEl.classList.remove('reveal');
    highscoresEl.classList.add('hidden');

    questionsEl.classList.remove('reveal');
    questionsEl.classList.add('hidden');

    scoreEl.removeChild(scoreEl.lastChild);
    questionNumber = 0
    gameover = '';
    timerEl.textContent = 0;
    score = 0;

    if (correctEl.className === 'reveal') {
        correctEl.classList.remove('reveal');
        correctEl.classList.add('hidden');
    }

    if (incorrectEl.className === 'reveal') {
        incorrectEl.classList.remove('reveal');
        incorrectEl.classList.add('hidden');
    }
};

var time = function () {
    timeLeft = 90

    var timerInt = setInterval(function() {
        timerEl.innerText = timeLeft;
        timeLeft--;

        if (gameover) {
            clearInterval(timerInt);
        }

        if (timeLeft < 0) {
            playerScores();
            timerEl.innerText = 0;
            clearInterval(timerInt);
        }
    }, 1000);
};

var question = function () {
    answerChoices();
    displayQuestion(quizQuestions[questionNumber]);
};

var answerChoices = function (){
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    };
}

var displayQuestion = function (index) {
    questionEl.innerText = index.Q;

    for (var i = 0; i < index.choices.length; i++) {
        var answerBtn = document.createElement('button');

        answerBtn.innerText = index.choices[i].choice;

        answerBtn.classList.add('a-btn');
        answerBtn.classList.add('a-choice');

        answerBtn.addEventListener("click", checkAnswer);
        answerBtnEl.appendChild(answerBtn);
        }
};

var startQuiz = function () {
    startEl.classList.add('hidden');
    startEl.classList.remove('reveal');
    questionsEl.classList.remove('hidden');
    questionsEl.classList.add('reveal');

    time();
    question();
};

var checkAnswer = function(event) {
    var select = event.target

    if (quizQuestions[questionNumber].A === select.innerText) {
        correctA();
        score = score + 20;
    } else {
        incorrectA();
        timeLeft = timeLeft - 15;
    }

    questionNumber++;

    if (quizQuestions.length > questionNumber) {
        question();
    } else {
        gameover = true
        playerScores();
    }
};

var correctA = function() {
    if (correctEl.className = 'hidden') {
        correctEl.classList.remove('hidden');
        correctEl.classList.add('reveal');
        incorrectEl.classList.remove('reveal')
        incorrectEl.classList.add('hidden');
    }
};

var incorrectA = function() {
    if (incorrectEl.className = 'hidden') {
        incorrectEl.classList.remove('hidden');
        incorrectEl.classList.add('reveal');
        correctEl.classList.remove('reveal')
        correctEl.classList.add('hidden');
    }
};

var playerScores = function() {
    questionsEl.classList.add('hidden');
    endEl.classList.remove('hidden');
    endEl.classList.add('reveal');

    var playerScore = document.createElement('hidden');
    playerScore.innerText = ('Congratulations, you have finished! Your score is ' + score + '!');
    scoreEl.appendChild(playerScore);
};

var newHighScore = function(event) {
    event.preventDefault();

    var initials = initialsEl.value;
    
    if (!initials) {
        return;
    }

    initialsFormEl.reset();

    var highScoreInput = {initials: initials, score: score};
    
    highScores.push(highScoreInput);
    highScores.sort((a, b) => {return b.score-a.score});

    while (scoreboardEl.firstChild) {
        scoreboardEl.removeChild(scoreboardEl.firstChild);
    }

    for (var i = 0; i < highScores.length; i++) {
        var highScore = document.createElement('li');
        highScore.className = 'highscore';
        highScore.innerHTML = highScores[i].initials + ' - ' + highScores[i].score;
        scoreboardEl.appendChild(highScore);
    }

    saveHighScore();
    displayHighScores();
};

var saveHighScore = function () {
    localStorage.setItem('High-Score-Inputs', JSON.stringify(highScores));
};

var displayHighScores = function () {
        highscoresEl.classList.remove('hidden');
        highscoresEl.classList.add('reveal');
        gameover = true;

    if (startEl.className === 'reveal') {
        startEl.classList.remove('reveal');
        startEl.classList.add('hidden');
    }

    if (questionsEl.className === 'reveal') {
        questionsEl.classList.remove('reveal');
        questionsEl.classList.add('hidden');
    }

    if (endEl.className === 'reveal') {
        endEl.classList.remove('reveal');
        endEl.classList.add('hidden');
    }

    if (correctEl.className === 'reveal') {
        correctEl.classList.remove('reveal');
        correctEl.classList.add('hidden');
    }

    if (incorrectEl.className === 'reveal') {
        incorrectEl.classList.remove('reveal');
        incorrectEl.classList.add('hidden');
    }
};

var loadHighScore = function () {
    var loadScore = localStorage.getItem('High-Score-Inputs');

    if (!loadScore) {
        return false;
    }

    loadScore = JSON.parse(loadScore);
    loadScore.sort((a, b) => {return b.score-a.score})

    for (var i = 0; i < loadScore.length; i++) {
        var highScore = document.createElement('li');
        highScore.className = 'highscore';
        highScore.innerHTML = loadScore[i].initials + ' - ' + loadScore[i].score;
        scoreboardEl.appendChild(highScore);
        highScores.push(loadScore[i]);
    }
}

var clearScoreboard = function () {
    highScores = [];

    while (scoreboardEl.firstChild) {
        scoreboardEl.removeChild(scoreboardEl.firstChild);
    }

    localStorage.clear(highScores);
}

loadHighScore();

startBtnEl.addEventListener('click', startQuiz);
restartBtnEl.addEventListener('click', renderCodeQuiz);
clearBtnEl.addEventListener('click', clearScoreboard);
viewScoresEl.addEventListener('click', displayHighScores);
initialsFormEl.addEventListener('click', newHighScore);