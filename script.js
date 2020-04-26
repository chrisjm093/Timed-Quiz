var timerEl = document.getElementById("timer");
var secondsLeft = 75;
var questionContainer = document.querySelector("#question-container");
var startButton = document.getElementById("start-btn");
var qIndex = 0;
var score = 75;
var highScoreList = document.querySelector("#high-score-list");
var initialsInput = document.querySelector("#initials-text")
var highScoreForm = document.querySelector("#high-score-form")
//var feedbackTimer = 2
//var feedbackEl = document.getElementsById("feedback");

var questionsArr = [
        {
        question : "What is the compression to breath ratio for a single rescuer?",
        answers : [
            "15:2",
            "30:2",
            "20:4",
            "Single Rescuer does not deliver breaths"
            ],
        correctAnswer: "30:2"
        },
        
        {
        question : "Which is NOT an example of an early warning sign of cardiac arrest?",
        answers : [
            "Symptomatic Hypertension",
            "Significant fall in urine output",
            "Systolic blood pressure more than 90 mm Hg",
            "Respiratory Rate < 6/min or > 30/min"
            ],
        correctAnswer: "Systolic blood pressure more than 90 mm Hg"
        },

        {
        question : "To minimize interruptions in chest compressions, which should you avoid?",
        answers : [
            "Giving breaths quickly",
            "Unnecessarily moving patient",
            "Pulse checks every 2 min",
            "Short analyisis of heart rhythm"
            ],
        correctAnswer:  "Unnecessarily moving patient"
        },
        {
        question: "A monitoring device that gives information about both circulation and ventilation is:",
            answers: [
            "A colormetric capnograph",
            "Cardiac monitor",
            "Pulse Oximiter",
            "Reservoir Bag"
            ],
        correctAnswer: "Pulse Oximiter"
        },
        {
        question: "What kind of stroke accounts for the majority of stroke?",
            answers: [
           "Intracerbral",
            "Ischemic",
            "Subarachnoid",
            "Embolic"
             ],
        correctAnswer: "Ischemic"
        },
        {
        question: "The T Wave on a cardiac monitor tracing is evidence of what change in polarization?",
            answers: [
            "Depolarization of the ventricles",
            "Depolarization of the atria",
            "Repolarization of the atria",
            "Repolarization of the ventricles"
            ],
        correctAnswer: "Repolarization of the ventricles"
        },
        {
        question: "Sinus bradycardia is defined by heartrate less than what?",
            answers: [
            "120 bpm",
            "80 bpm",
            "50 bpm",
            "100 bpm"
            ],
        correctAnswer: "50 bpm"
        } 
    ];

//Set time to 75seconds and count down
function setTime() {
    timerEl.textContent = 'Time Remaining: ' + secondsLeft;
    
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = 'Time Remaining: ' + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
           //endQuiz();
        }
    }, 1000);
}

//function to render the question and answers
function renderQuestion() {
   
    //clears previous question
    questionContainer.innerHTML="";
        var answers; 
        
        //print question to page
           var  print = document.createElement("div");
           var  q = document.createTextNode(questionsArr[qIndex].question);
               
                print.appendChild( q );
                document.getElementById("question-container").appendChild( q );

                //create series of answer buttons
           for (var n = 0; n < questionsArr[qIndex].answers.length; n++) {
            answers= questionsArr[qIndex].answers[n];  
                console.log(qIndex);    
            
                var btn = document.createElement("button");
                var j = document.createTextNode(answers);
                var correctAnswer = questionsArr[qIndex].correctAnswer;

                btn.setAttribute('class', 'btn btn-primary btn-block' );
                btn.appendChild(j);
                document.getElementById("question-container").appendChild(btn);
                
                //Add click event to buttons that will decrease time for wrong answer and initiate the next question if it is the correct answer
                btn.addEventListener("click", function(event) {
                     
                var userAnswer = this.textContent;
                    

                    if (userAnswer !== correctAnswer) {
                        //decreases time by one second if incorrect answer is clicked
                        secondsLeft --;
                        //feedbackEl.createTextNode("Wrong");
                        
                        //ends quiz if timer runs out or once last question is answered
                    } else if (secondsLeft === 0 || qIndex === questionsArr.length - 1 ) {
                        endQuiz()
                        
                        //transitions to next question if current question is answered correctly
                    } else {
                        qIndex ++;
                        
                        renderQuestion();
                    };
                    
                });
            }
 
}



function endQuiz() {
        score = secondsLeft
        window.localStorage.setItem('score', score)
        window.location.href = "High-Score-Page.html";
        renderHighScores()
        
        // highScoreForm.addEventListener("submit", function(event){
        //     event.preventDefault();
        
        //     var initialsText = initialsInput.nodeValue.trim();
        //     console.log(initialsInput)
        //     console.log(initialsText);
        //     if (initialsText === "") {
        //         return;
        //     }
        //     initialsArr.push(initialsText);
        //     initialsInput.value = "";
        
        // });
    };

var storedScore = localStorage.getItem("score")

var initialsArr = [];

// function renderHighScores() {
//     //clear high score list
//     highScoreList.innerHTML = "";
    
//     //render high score list
//     for (var x = 0; x < initialsArr.length; x++){
//         var initials = initialsArr[x];
//         var li = document.createElement("li");    
        
//         li.textContent = initials;
//         li.setAttribute("data-index", x);

//         highScoreList.appendChild(li);
//     }
// }
 





renderQuestion();
setTime();

