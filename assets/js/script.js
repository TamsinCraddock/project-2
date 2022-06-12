const answers = ["a","b","c","d"]
const questions = [
    {
        question: 'what is answer 1',
        answer: 0
    },
    {
        question: 'what is answer 2',
        answer: 2
    },
    {
        question: 'what is answer 3',
        answer: 1
    },
    {
        question: 'what is answer 4',
        answer: 0
    }
];
const gameState = {
    currentQuestion: 0,
    currentScore: 0,
    questionOutput : null,
}


// Wait for the DOM to finish loading before running the game
// Get the button elements and add event lsteners to them

document.addEventListener("DOMContentLoaded", function(){
    console.log("loaded");
    const buttons = document.getElementsByClassName("answer-button");
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
        })
    }
    runGame()
})

function runGame() {
    displayQuestion();
}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incermentScore() {

}

function incrementWrongAnswer() {

}

function displayQuestion() {
    console.log("setting question");
    gameState.questionOutput.textContent = questions[gameState.currentQuestion].question

}