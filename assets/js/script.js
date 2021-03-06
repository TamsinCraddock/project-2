const answers = ["a","b","c","d"];
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
    },
    { //Q7
        question: "What's a baby rabbit called?",
        options: ["A joey","A bunny","A kitten","A kit"],
        answer: 3
    },
    { //Q8
        question: 'What is the smallest country in the world?',
        options: ["Monaco","Vatican City","Palau","San Marino"],
        answer: 1
    },
    { //Q9
        question: "What is Scooby Doo's full name?",
        options: ["Scumbert Doo","Scooby Doodle","Scoobert Doo","Scooby Doolittle"],
        answer: 2
    },
    { //Q10
        question: 'Who invented the World Wide Web in 1990?',
        options: ["Tim Berners-Lee","Vinton Cerf","Bill Gates","Elon Musk"],
        answer: 0
    }
];
const gameState = {
    currentQuestion: 0,
    currentScore: 0,
    wrongAnswers: 0,
    questionOutput : null,
    questionProgress : null,
    started: false,
    scoreElements : {
        score: null,
        incorrect: null
    },
    options:[]
};

document.addEventListener("DOMContentLoaded", function(){
    "use strict";
    const buttons = document.getElementsByClassName("answer-button");
    gameState.options = document.getElementsByClassName("option");
    gameState.questionOutput = document.getElementById("question");
    gameState.questionProgress = document.getElementById("question-progress");
    const nextButton = document.getElementById("next-button");
    gameState.scoreElements.score = document.getElementById("score");
    gameState.scoreElements.incorrect = document.getElementById("incorrect");
    const statuses = document.getElementsByClassName("status");
    const openHelpButton = document.getElementById("open-help");
    const helpArea = document.getElementById("help-area");
    const closeHelpButton = document.getElementById("close-help");
    const welcomeArea = document.getElementById("welcome-area");
    const questionArea = document.getElementById("question-area");

    // Help pop up

    openHelpButton.addEventListener("click", function () {
        helpArea.style.display = "block";
        document.body.style.overflow = "hidden";
    });

    closeHelpButton.addEventListener("click", function() {
        helpArea.style.display = "none";
        document.body.style.overflow = "inherit";
    });

    // Next button

    nextButton.addEventListener("click", function() {
        nextButton.disabled = true;
        
        if(!gameState.started) {
            questionArea.style.display = "flex";
            welcomeArea.style.display = "none";
            this.textContent = "Next";
            gameState.started = true;
            return;
        }

        if(gameState.currentQuestion >= questions.length - 1) {
            setEndGameMessage();
            this.style.display = "none";
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
                statusElement.appendChild(createAnswerStatus(false));
            }
            toggleButtons(buttons, true);
            nextButton.disabled = false;
            if(gameState.currentQuestion >= questions.length - 1) {
                nextButton.textContent = "Finish";
            }
        });
    }
    displayQuestion();
});

// Question status - correct or incorrect?

function createAnswerStatus(isCorrect) {
    "use strict";
    const span = document.createElement("span");
    span.textContent = isCorrect ? " Correct" : " Incorrect";
    const icon = document.createElement("i");
    span.prepend(icon);
    span.classList.add("active", isCorrect ? "green" : "red");
    icon.classList.add("fa", isCorrect ? "fa-check" : "fa-times");
    return span;
}

function emptyNodes(nodes) {
    "use strict";
    for(let node of nodes) {
        node.innerHTML = "";
    }
}

function toggleButtons(buttons, isDisabled) {
    "use strict";
    for (let button of buttons) {
        "use strict";
        button.disabled = isDisabled;
    }
}

function checkAnswer(answer) {
    "use strict";
    const currentQuestion = questions[gameState.currentQuestion];
    return answers.indexOf(answer) === currentQuestion.answer;
}

function incrementScore() {
    "use strict";
    gameState.scoreElements.score.textContent = ++gameState.currentScore;
}

function incrementWrongAnswer() {
    "use strict";
    gameState.scoreElements.incorrect.textContent = ++gameState.wrongAnswers;
}

// Question count display

function displayQuestion() {
    "use strict";
    const currentQuestion = questions[gameState.currentQuestion];
    gameState.questionOutput.textContent = currentQuestion.question;
    gameState.questionProgress.textContent = `Question ${gameState.currentQuestion+1} of ${questions.length}`;
    for(let i = 0; i < gameState.options.length; i++) {
        gameState.options[i].textContent = currentQuestion.options[i];
    }
}

// End game message

function setEndGameMessage() {
    "use strict";
    const percentage = Math.floor(gameState.currentScore / questions.length * 100);
    gameState.questionOutput.textContent = `${gameState.currentScore} / ${questions.length} correct - ${percentage}%`;
    gameState.questionProgress.textContent = percentage < 70 ? "Better Luck Next Time!" : "Well Done";
    for(let i = 0; i < gameState.options.length; i++) {
        gameState.options[i].parentElement.style.display = "none";
    }
}