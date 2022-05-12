
// This is the list of variables used in the functions

var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')

var questionContainerEl = document.getElementById('question-container')

// setting variables to select a random question
var shuffledQuestions, currentQuestionIndex
const questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-container')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// start the game
function startGame() {
    startButton.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    // selects a random question
    shuffledQuestions = questions.sort(()=> Math.floor(Math.random()))
    currentQuestionIndex = 0
    setNextQuestion()
}

// setting the next question
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
}

function showQuestion(questions) {
    questionEl.innerText = questions.question
    questions.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
    
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild (answerButtonsEl.firstChild)
    }
}

// selecting the answer
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    }) 
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    }else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
   
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: "_____ are used to perform certian tasks in a web application.",
        answers: [
            {text:"Operands", correct: false },
            {text:"Variables", correct: false },
            {text:"Functions", correct: true },
            {text:"Operators", correct: false },
        ]
    },{
        question: "A boolean value is either true or false",
        answers: [
            {text:"True", correct: true },
            {text:"False", correct: false },

        ]
    },{
        question: "It is possible to convert a string into an array",
        answers: [
            {text:"True", correct: true },
            {text:"False", correct: false },
            
        ]
    },{
        question: "What does API stand for?",
        answers: [
            {text:"Accessable Program Integration", correct: false },
            {text:"Available Processing Intervals", correct: false },
            {text:"Application Programming Interface", correct: true },
            {text:"All Parent Integers", correct: false },
        ]
    },{
        question: "A _____ stores a value that can be changed later on",
        answers: [
            {text:"Variable", correct: true },
            {text:"Operator", correct: false },
            {text:"Function", correct: false },
            {text:"Constant", correct: false },
        ]
    },{
        question: "_____ are special symbols used to perfom operations on operands.",
        answers: [
            {text:"Elements", correct: false },
            {text:"Scripts", correct: false },
            {text:"Constants", correct: false },
            {text:"Operators", correct: true },
        ]
    },
    
]