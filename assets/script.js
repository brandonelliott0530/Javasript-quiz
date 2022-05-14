
// This is the list of variables used in the functions
// =================================================================================================
var timerEl = document.getElementById('timer')
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var counter = 10;
var score = 0;
// setting variables to select a random question
// =================================================================
var shuffledQuestions, currentQuestionIndex = 0
const questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-container')
// event listeners
// =================================================================

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', startCountdown)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// This function is for the countdown timer. Controlled by the click listener above
// =================================================================
function startCountdown(event) {
    event.preventDefault
    const interval = setInterval(() => {
        counter--;
        if(counter === 0) {
            clearInterval(interval)
            var restart = confirm('You have ran out of time, would you like to try again?')  
            if (restart === true) {
                startGame()
                score = 0
                resetTimer()
                
            }   else { 
                endGame()
                clearInterval(interval)
                questionContainerEl.classList.add('hide')  }       
                       
        }
        timerEl.textContent = counter + 's'
    }, 1000);
     
}


function resetTimer() {
    counter = 10
    const interval = setInterval(() => {
        counter--;
        if(counter === 0) {
            clearInterval(interval)
            var restart = confirm('You have ran out of time, would you like to try again?')  
            if (restart === true) {
                startGame()
                resetTimer()
                score = 0
            }  else {
                endGame()
                clearInterval(interval)
                questionContainerEl.classList.add('hide')
            }        
                       
        }
        timerEl.textContent = counter + 's'       
}, 1000)
}



// start the game
// =================================================================
function startGame() {
    startButton.classList.add('hide')
    questionContainerEl.classList.remove('hide')
    // selects a random question not working, but I don't want to break my quiz to fix it 
    // ===================================
    shuffledQuestions = questions.sort(()=> Math.floor(Math.random()))
    currentQuestionIndex = 0
    if(currentQuestionIndex === shuffledQuestions.arrlength) {
         endGame()
        
    }
    setNextQuestion()
}

// setting the next question
// =================================
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

    
}

//  This function replaces the tile cards with the answers stored in the variables below
// =================================
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
// Resets the question contianer status
// =================================
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild (answerButtonsEl.firstChild)
    }
}

// selecting the answer
// =================================
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
        
        // adds 1 to the score for every question answered correctly
        // =================================
    } if (correct) {
        score ++
        // subtracts one from the counter for every incorrect answer
        // ===============================
    } if (!correct) {
        counter--
    }
    
    
}

// Behaviour for the end of the game
// =================================
function endGame() {
    alert("Your score was " + score)
    saveScore()
    resetState()
    
}

// function to save the score
// =================================================
function saveScore() {
    var currentScore = JSON.parse(localStorage.getItem("score")) ||[]
    
    var initials = prompt("Please enter your initials")
    var userObj = {
        initials,
        score
    }
    currentScore.push(userObj)
    localStorage.setItem('score', JSON.stringify(currentScore))
    writeScore()
    
    console.log(currentScore)
}


// Writes 5 scores to the leaderboard from localStorage
// =================================================
function writeScore() {
    var lastScore = JSON.parse(localStorage.getItem('score'))
    document.querySelector('#score1').innerHTML = lastScore[0].initials + " scored " + lastScore[0].score
    document.querySelector('#score2').innerHTML = lastScore[1].initials + " scored " + lastScore[1].score
    document.querySelector('#score3').innerHTML = lastScore[2].initials + " scored " + lastScore[2].score
    document.querySelector('#score4').innerHTML = lastScore[3].initials + " scored " + lastScore[3].score
    document.querySelector('#score5').innerHTML = lastScore[4].initials + " scored " + lastScore[4].score
    
}
            
        
    


 

// Adds classes to the answers of correct and wrong
// =================================
function setStatusClass(element, correct) {
    clearStatusClass(element)
    
    if(correct) {
        element.classList.add('correct')
        
    } else {
        element.classList.add('wrong')
        
    }
}

// Clears the class of the question tiles
// =================================
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// an array of questions with the answers stroed inside of them
// =================================
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