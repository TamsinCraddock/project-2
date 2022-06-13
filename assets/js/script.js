const answers = ["a","b","c","d"]
const questions = [
    { //Q1
        question: 'Which five colours make up the Olympic rings?',
        options: ["White, blue, green, yellow and red","Black, green, blue, yellow and red","Black, green, blue, orange and red","Black, gold, blue, yellow and red"],
        answer: 1
    },
    { //Q2
        question: 'Which country is brie cheese originally from?',
        options: ["Switzerland","Portugal","Italy","France"],
        answer: 3
    },
    { //Q3
        question: 'How many time zones are there in Russia?',
        options: ["11","12","13","14"],
        answer: 0
    },
    { //Q4
        question: "What is the name of Bridget Jones' baby in the third Bridget Jones film?",
        options: ["Duke","Harry","William","Henry"],
        answer: 2
    },
    { //Q5
        question: 'How many elements are there in the periodic table?',
        options: ["110","115","118","121"],
        answer: 2
    },
    { //Q6
        question: 'What does the AC button on a calculator stand for?',
        options: ["All clear","Adjacent clear","Air conditioning","All clean"],
        answer: 0
    }
];
const gameState = {
    currentQuestion: 0,
    currentScore: 0,
    wrongAnswers: 0,
    questionOutput : null,
    scoreElements : {
        score: null,
        incorrect: null
    },
    options:[]
}


// Wait for the DOM to finish loading before running the game
// Get the button elements and add event lsteners to them

document.addEventListener("DOMContentLoaded", function(){
    const buttons = document.getElementsByClassName("answer-button");
    gameState.options = document.getElementsByClassName("option");
    gameState.questionOutput = document.getElementById("question");
    const nextButton = document.getElementById("next-button");
    gameState.scoreElements.score = document.getElementById("score");
    gameState.scoreElements.incorrect = document.getElementById("incorrect");
    const statuses = document.getElementsByClassName("status");

    nextButton.addEventListener("click", function(){
        if(gameState.currentQuestion >= questions.length - 1) {
            setEndGameMessage();
            return;
        }
        gameState.currentQuestion++;
        displayQuestion();
        toggleButtons(buttons, false);
        emptyNodes(statuses);
    });

    for (let button of buttons) {
        button.addEventListener("click", function(){
            const answer = this.getAttribute("data-value");
            const statusElement = button.parentElement.getElementsByClassName("status")[0];
            if(checkAnswer(answer)) {
                incrementScore();
                statusElement.appendChild(createAnswerStatus(true));
            } else {
                incrementWrongAnswer();
                statusElement.appendChild(createAnswerStatus(false))
            }
            toggleButtons(buttons, true);
            console.log(gameState.currentQuestion)
            console.log(questions.length)
            if(gameState.currentQuestion >= questions.length - 1) {
                nextButton.textContent = "Finish";
            }
        })
    }
    runGame()
})

function createAnswerStatus(isCorrect) {
    const span = document.createElement("span");
    span.textContent = isCorrect ? " Correct" : " Incorrect";
    const icon = document.createElement("i");
    span.prepend(icon);
    span.classList.add(isCorrect ? "green" : "red");
    icon.classList.add("fa", isCorrect ? "fa-check" : "fa-times");
    return span;
}

function emptyNodes(nodes) {
    for(let node of nodes) {
        node.innerHTML = "";
    }
}

function toggleButtons(buttons, isDisabled) {
    for (let button of buttons) {
        button.disabled = isDisabled;
    }
}

function runGame() {
    displayQuestion();
}

function checkAnswer(answer) {
    const currentQuestion = questions[gameState.currentQuestion];
    return answers.indexOf(answer) === currentQuestion.answer;
}

function incrementScore() {
    gameState.scoreElements.score.textContent = ++gameState.currentScore;
}

function incrementWrongAnswer() {
    gameState.scoreElements.incorrect.textContent = ++gameState.wrongAnswers;
}

function displayQuestion() {
    const currentQuestion = questions[gameState.currentQuestion];
    gameState.questionOutput.textContent = currentQuestion.question;
    for(let i = 0; i < gameState.options.length; i++) {
        gameState.options[i].textContent = currentQuestion.options[i];
    }

}

function setEndGameMessage() {
    gameState.questionOutput.textContent = "Well Done"
    for(let i = 0; i < gameState.options.length; i++) {
        gameState.options[i].parentElement.style.display = "none";
    }
}