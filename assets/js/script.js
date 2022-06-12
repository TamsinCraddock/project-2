const answers = ["a","b","c","d"]
const questions = [
    {
        question: 'What is the captial of France',
        options: ["Johannesburg", "London", "Paris", "Berlin"],
        answer: 0
    },
    {
        question: 'what is answer 2',
        options: ["one", "two", "three", "Four"],
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