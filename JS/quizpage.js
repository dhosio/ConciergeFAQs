// Global Variables
let choiceSelected = false;
const MAX_QUESTIONS = 5;
const QUESTION_SCORE = 1;

// Select all div choices
let allChoiceDivs = document.querySelectorAll('div[class~=optionContainer]')

    // Set a click handler on each div
    for (let choiceDiv of allChoiceDivs){
        choiceDiv.onclick = choiceClickHandler;
    }

// For the Choice Click Handler
function choiceClickHandler(event){

    let currentDiv = event.currentTarget;

    // To remove the background color from any previously selected option
    let parent = currentDiv.parentElement;
    let children = parent.children;

    for (let child of children){
        if (child.className === "optionContainer"){
            child.removeAttribute("style");
        }
    }

    // To set the background color of the selected option
    let correctBackgroundcolor = '#7cb918'; //Green
    let wrongBackgroundcolor = '#c50505'; //Red
    currentDiv.setAttribute("style", `background-color: ${correctBackgroundcolor}; color: white; font-weight:bold;`);

    // Set choice selected to true
    choiceSelected = true;

}

// Setting an event listener to the 'Next' Button
let nextButton = document.querySelector('#nextButton');

    // Variable to hold the question number
    let questionNumber = 1;
    let score = 0;

    // Adding the event listener
    nextButton.addEventListener('click', (event) => {

        // Prevent page from reloading
        event.preventDefault();

        if ( !choiceSelected ){

            // Sweet Alert to show choice not selected
            swal({
                title: 'Error!',
                text: 'You must select an answer before proceeding',
                icon: 'error'
            })

        }else {

            // Get the answer selected by the user
            const currentForm = document.forms[questionNumber];
            const chosenAnswer = currentForm.elements.option.value;
            alert(chosenAnswer)

            // Get the div that contains the current question
            const currentQuestionDiv = document.getElementById(`qn${questionNumber}`);
            // Hide the current question
            currentQuestionDiv.setAttribute("hidden", "true");

            // Reset choice selected to false
            choiceSelected = false;

            // Increment the questions counter
            questionNumber++;

            // To check if the number of questions are depleted
            if ( questionNumber === ( MAX_QUESTIONS + 1 ) ){

                // Show an alert to end quiz
                swal({
                    title: 'Congratualtions!',
                    text: 'You have successfully completed the Quiz',
                    icon: 'success',
                    button: 'View Results'
                })

                // Hide the Quiz container
                const quizContainer = document.querySelector('.quizContainer');
                quizContainer.setAttribute("hidden", "true");

                // Show the Results Container
                const resultContainer = document.getElementById("rs1");
                resultContainer.removeAttribute("hidden");

            } else {

                // Showing user progress
                let progressText = document.querySelector('#progressText')
                let progressBar = document.querySelector('#progressBarFull')
                let scoreText = document.querySelector('#score')

                progressText.innerText = `Question ${questionNumber} of ${MAX_QUESTIONS}`
                progressBar.style.width = `${ (questionNumber/MAX_QUESTIONS) * 100 }%`
                scoreText.innerText = ++score;

                // Reveal the next question
                const nextQuestionDiv = document.getElementById(`qn${questionNumber}`);
                nextQuestionDiv.removeAttribute("hidden");

            }

        }

    })