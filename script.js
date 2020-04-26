var timerEl = document.getElementById("timer");
var secondsLeft = 75;
var questionContainer = document.querySelector("#question-container");
var startButton = document.getElementById("start-btn");

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
        }, 
    ];

var qIndex = 0;


//Set time to 75seconds and count down
function setTime() {
    timerEl.textContent = 'Time Remaining: ' + secondsLeft;
    
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = 'Time Remaining: ' + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
           
        }
    }, 1000);
}

//function to render the question and answers
function renderQuestion() {
    //clears previous question
    questionContainer.innerHTML="";
        var answers; 
        
          //answers = [];
           
        //print question to page
           var  print = document.createElement("div");
           var  q = document.createTextNode(questionsArr[qIndex].question);
               
                print.appendChild( q );
                document.getElementById("question-container").appendChild( q );

                //create series of answer buttons
           for (var n = 0; n < questionsArr[qIndex].answers.length; n++) {
            answers= questionsArr[qIndex].answers[n];  
                
                var btn = document.createElement("button");
                var j = document.createTextNode(answers);
                var correctAnswer = questionsArr[qIndex].correctAnswer;

                btn.setAttribute('class', 'btn btn-primary btn-block' );
                btn.appendChild(j);
                document.getElementById("question-container").appendChild(btn);
                
                //Add click event to buttons that will decrease time for wrong answer
                btn.addEventListener("click", function(event) {
                    //console.log(event);
                    //console.log(this);
                    
                var userAnswer = this.textContent;
                //console.log(this)    
                    if (userAnswer !== correctAnswer) {
                        secondsLeft --;

                    } else {
                        qIndex ++;
                       
                        

                        renderQuestion();
                        //check out .removeChild to remove old buttons
                    };
                
                    
                });
            }
 
}


renderQuestion();
setTime();

