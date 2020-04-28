var timerEl = document.getElementById("timer");
var secondsLeft = 75;
var questionContainer = document.querySelector("#question-container");
var startButton = document.getElementById("start-btn");
var qIndex = 0;
var score = 75;
var scores = [];
var names = [];

//var feedbackTimer = 2
//var feedbackEl = document.getElementsById("feedback");
var timerContainer = document.getElementsByClassName("timer-container");
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

// ends quiz, clears screen of quiz divs, stores score
function endQuiz() {
      var removeDivs = document.body;
    
    var score = secondsLeft
    
    localStorage.setItem('score', (score));
    
    removeDivs.innerHTML='';
    scoreDisplay();
};

// function getIt() {
//     //get stored scores from local storage
//     var storedScores = localStorage.getItem(score);
//     if (storedScores !== null) {
//         scores = storedScores;
//         localStorage.setItem("scores", JSON.stringify(scores));
//     }

// };

// function nameIt() {
//     var storedInitials = localStorage.getItem("names");
//     if (storedInitials !== null) {
//         names = storedInitials;
//         localStorage.setItem("names", JSON.stringify(names));
//     }
// };

// score displays with form elements, pull high score and display it, prompt user to enter initials in high score form.

function scoreDisplay() {
    var scoreDiv= document.createElement("div");
    var scoreH2 = document.createElement("h2");
    var initialsForm= document.createElement("form");
    var formLabel = document.createElement("label");
    var formInput = document.createElement("input");
    var submitBtn = document.createElement('input');
    var endScore = localStorage.getItem('score', score);


    //set text content of endgame elements
    scoreH2.textContent = "Score: " + endScore;
    formLabel.innerHTML = "Enter Initials:  ";
    submitBtn.textContent = "Submit";

    //append elements
    document.body.appendChild(scoreDiv);
    scoreDiv.appendChild(scoreH2);
    scoreDiv.appendChild(initialsForm);
    initialsForm.appendChild(formLabel);
    initialsForm.appendChild(formInput);
    initialsForm.appendChild(submitBtn);

    //style elements
    scoreDiv.setAttribute("style", "margin-top: 10em; margin-left: 28em; width: 400px; text-align: center; padding: 10px; border: 2px solid grey; background-color: whitesmoke");
    scoreH2.setAttribute("style", "font-family: 'Roboto', sans-serif;");
    formInput.setAttribute("style", "margin-left 5px");
    submitBtn.setAttribute("style", "margin-left: 5px" );
    submitBtn.setAttribute("type", "submit");
    
    //add an event listener that will store initials and high score with JSON stringify and initiate High Score page.
    submitForm();
    
    function submitForm() {
        
        submitBtn.addEventListener("click", function(event) {
            
            event.preventDefault();
            name = formInput.value.trim();
                   
            localStorage.setItem('name', (name));
                          
         highScoreList();
         });
        };
};

// getIt();
// nameIt();

//render high score list 
function highScoreList(){
    var removeDivs = document.body;
    var highScoreDiv = document.createElement('div');
    var highScoreUl = document.createElement('ul');
    var highScoreH2 = document.createElement('h2');
    var againBtn = document.createElement('button');
    var  highScoreLi = document.createElement( 'li' );
    var listInitials = localStorage.getItem('name');
    var listScore = localStorage.getItem('score');
    
    //clear submit form
    removeDivs.innerHTML='';
   
    //append high score list
    document.body.appendChild(highScoreDiv);
    highScoreDiv.appendChild(highScoreH2);
    highScoreDiv.appendChild(highScoreUl);
    highScoreUl.appendChild(highScoreLi);

    //set attributes of list
    highScoreDiv.setAttribute("style", "margin-top: 10em; margin-left: 28em; width: 400px; padding: 10px; border: 2px solid grey; background-color: whitesmoke");

    //display initials and score
    highScoreH2.textContent = "High Scores";
    highScoreLi.textContent = listInitials + "  ...............  " + listScore; 
    
    againBtn.setAttribute("class", "btn btn-primary btn-block ");
    againBtn.setAttribute("style", "margin-left: 31em");
    againBtn.setAttribute("onclick", "Timed-Quiz.index.html")
    againBtn.textContent = "Play Again?" ;
   
    //document.body.appendChild(againBtn);
    
    // againBtn.addEventListener("click", function() {
       
    // });

    
    // //loop to generate high score list
    // for (var z = 0; z < names.length; z++){
    //     var nameItem = names[z];
    //     console.log (nameItem)
    //     var highScoreLi = document.createElement('li');
    //     highScoreLi.textContent = nameItem; 
    //     highScoreUl.appendChild(highScoreLi);
        
        
        // for (var s = 0; s < scores.length; s++){
        //     var scoreItem = scores[s];

        //     highScoreLi.textContent = nameItem + ".........."+ scoreItem;

        //     highScoreLi.setAttribute("data-index", s);
        //     highScoreUl.appandChild(highScoreLi);
            
        // }

          
};


 
renderQuestion();
setTime();

