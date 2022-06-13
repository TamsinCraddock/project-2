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
    questionOutput : null,
    options:[]
}


// Wait for the DOM to finish loading before running the game
// Get the button elements and add event lsteners to them

document.addEventListener("DOMContentLoaded", function(){
    console.log("loaded");
    const buttons = document.getElementsByClassName("answer-button");
    gameState.options = document.getElementsByClassName("option");
    gameState.questionOutput = document.getElementById("question");
    const nextButton = document.getElementById("next-button");

    nextButton.addEventListener("click", function(){
        gameState.currentQuestion++;
        displayQuestion();
    });



    for (let button of buttons) {
        button.addEventListener("click", function(){
            const answer = this.getAttribute("data-value");
            alert(`You clicked ${answer}`);
            checkAnswer(this);
        })
    }
    runGame()
})

function runGame() {
    displayQuestion();
}

// TODO
function checkAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayQuestion() {
    const currentQuestion = questions[gameState.currentQuestion];
    gameState.questionOutput.textContent = currentQuestion.question;
    console.log(gameState.options)
    for(let i = 0; i < gameState.options.length; i++) {
        gameState.options[i].textContent = `${answers[i]}: ${currentQuestion.options[i]}`
    }

}