// Your code here

var questionsArr = [
    {
        question: 'In which country is the city of Barcelona located?',
        answer: 'Spain',
        options: [
            'Portugal',
            'Argentina',
            'Spain',
            'Italy',
            'France'
      ]
    },
    {
        question: 'In which country is the city of Buenos Aires located?',
        answer: 'Argentina',
        options: [
            'Chile',
            'Argentina',
            'Brazil',
            'Uruguay',
            'Paraguay'
        ]
      },
      {
        question: 'In which country is the city of Sydney located?',
        answer: 'Australia',
        options: [
            'New Zealand',
            'Canada',
            'United States',
            'Australia',
            'South Africa'
        ]
      },
      {
        question: 'In which country is the city of Rome (Roma) located?',
        answer: 'Italy',
        options: [
            'France',
            'Greece',
            'Spain',
            'Italy',
            'Turkey'
        ]
      },
      {
        question: 'In which country is the city of Oxford located?',
        answer: 'United Kingdom',
        options: [
            'United States',
            'United Kingdom',
            'Canada',
            'Australia',
            'Ireland'
        ]
      },
  ]

  var quizContainer = document.getElementById('quiz')
  var score = 0 
  var currentQuestion = 0 
  var timeRemaining
  var timerId

  quizContainer.onclick = function (e){
    if (e.target.id === 'start-quiz'){
      drawQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON') {
      if ( e.target.textContent === questionsArr[currentQuestion].answer){
        score++
      }
      clearInterval(timerId)
      currentQuestion++

      if(currentQuestion< questionsArr.length){
        drawQuestion()
      } else {
        endGame()
      }
    }
  }

  function drawGameStart() {
    score = 0 
    currentQuestion = 0 
    quizContainer.innerHTML = ""
    var previousScore  = localStorage.getItem('previous-score')

    if (previousScore) {
      var previousScoreEl = document.createElement('p')
      previousScoreEl.textContent = 'Previous Score: ' + previousScore
      quizContainer.appendChild(previousScoreEl)
    }

    var startBtn = document.createElement('button')
    startBtn.id = 'start-quiz'
    startBtn.textContent = "Start Quiz!"
    quizContainer.appendChild(startBtn)

  }
// Button for choices and questions
  function drawQuestion(){
    var questionObj = questionsArr[currentQuestion]
    quizContainer.innerHTML= ""

    var questionTextEl = document.createElement('p')
    questionTextEl.textContent = questionObj.question
    quizContainer.appendChild(questionTextEl)

    var choicesContainer = document.createElement('div')
    choicesContainer.id = 'choices'
    quizContainer.appendChild(choicesContainer)

    questionObj.options.forEach(function(choice){
      var btn = document.createElement('button')
      btn.textContent = choice
      choicesContainer.appendChild(btn)

    })

    //Timer 
    timeRemaining = 30
    var timerEl = document.createElement('p')
    timerEl.id = 'timer'
    timerEl.textContent = timeRemaining
    quizContainer.appendChild(timerEl)

    startTimer()

  }

  function startTimer(){
    var timerEl = document.getElementById('timer')
    
    timerId = setInterval(function(){
      timeRemaining--
      if(timeRemaining >= 0){
        timerEl.textContent = timeRemaining
      } else { 
        clearInterval(timerId)

        currentQuestion ++

        if (currentQuestion < questionsArr.length){
          drawQuestion()
        } else {
          endGame()
        }
      }
    }, 1000)
  }

  function endGame(){
    quizContainer.innerHTML = ""
    
    var percentage = Math.round(score / questionsArr.length * 100) + "%"
    localStorage.setItem('previous-score', percentage)
    drawGameStart()
  }

  drawGameStart()