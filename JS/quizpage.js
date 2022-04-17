// Global Variables
let choiceSelected = false;
const MAX_QUESTIONS = 5;
const QUESTION_SCORE = 1;

// Select all div choices
let allChoiceDivs = document.querySelectorAll('label[class~=optionContainer]')

// Set a click handler on each div
for (let choiceDiv of allChoiceDivs) {
    choiceDiv.onclick = choiceClickHandler;
}

// For the Choice Click Handler
function choiceClickHandler(event) {

    let currentDiv = event.currentTarget;

    // To remove the background color from any previously selected option
    let parent = currentDiv.parentElement;
    let children = parent.children;

    // Remove only previously selected option from all except checkboxes
    if (questionNumber !== 2) {

        for (let child of children) {
            if (child.className === "optionContainer") {
                child.removeAttribute("style");
            }
        }

    }

    // To set the background color of the selected option
    let correctBackgroundcolor = '#7cb918'; //Green
    let wrongBackgroundcolor = '#c50505'; //Red
    currentDiv.setAttribute("style", `background-color: ${correctBackgroundcolor}; color: white; font-weight:bold;`);

    // Set choice selected to true
    choiceSelected = true;

}

// This is for the drag and drop functionality

// Get all the draggable items
const draggableElements = document.querySelectorAll('.draggableContainer');

// To get the drop zone
const dropZone = document.querySelector('#dropLocation')

// Then add an event listener
for (const draggableElement of draggableElements) {

    draggableElement.addEventListener('dragstart', event => {
        event.dataTransfer.setData("text", draggableElement.id)
    })

    // Adding drag over event listener
    dropZone.addEventListener("dragover", e => {
        // Prevent default behaviour
        e.preventDefault();

        // Adding the style class to the drop zone
        dropZone.classList.add("dragZone--over");
    })

    // When the item is not in the drag zone
    dropZone.addEventListener("dragleave", e => {
        dropZone.classList.remove("dragZone--over");
    })

    // Adding the drop listener
    dropZone.addEventListener("drop", e => {
        // Prevent default behaviour
        e.preventDefault();

        // To actually move the element
        const droppedElementId = e.dataTransfer.getData("text");
        const droppedElement = document.getElementById(droppedElementId);

        if (dropZone.child == null) {
            dropZone.appendChild(droppedElement);
            dropZone.classList.remove("dragZone--over");
        } else {
            dropZone.replaceChild(droppedElement);
        }

    })

}

// Declaring the 'Next' Button
let nextButton = document.querySelector('#nextButtonContainer');

// Setting an event listener to the 'Check' Button
let checkButtons = document.querySelectorAll('.checkButton');

// Event Listener
for (let checkButton of checkButtons) {

    checkButton.addEventListener('click', event => {
        // Prevent refreshing
        event.preventDefault();

        // To check the answers put by the user
        if (!choiceSelected) {

            // Sweet Alert to show choice not selected for all except question 3
            swal({
                title: 'Error!',
                text: 'You must select an answer before proceeding',
                icon: 'error'
            })

        } else {

            // Hide the check button
            checkButton.setAttribute("hidden", "true");

            // Show the Feedback Container
            const feedbackContainer = document.querySelector(`#feedback${questionNumber}`);
            feedbackContainer.removeAttribute("hidden");
            // Also show the Next button
            nextButton.removeAttribute("hidden");

        }
    })
}

// Variable to hold the question number
let questionNumber = 1;
let score = 0;

// HUD to show user progress
let progressText = document.querySelector('#progressText')
let progressBar = document.querySelector('#progressBarFull')
let scoreText = document.querySelector('#score')

// Adding the event listener
nextButton.addEventListener('click', (event) => {

    // Prevent page from reloading
    event.preventDefault();

    if (!choiceSelected) {

        // Sweet Alert to show choice not selected for all except question 3
        swal({
            title: 'Error!',
            text: 'You must select an answer before proceeding',
            icon: 'error'
        })

    } else {

        if (questionNumber === 1) {

            // Get the answer selected by the user
            // const currentForm = document.forms.qn1ChoiceForm;
            // const chosenAnswer = currentForm.elements.choice.value;

            const answer = document.querySelector('input[name="choice"]:checked').value;

            // Check if the chossen answer is correct
            let correctAnswer = "Dhosio Regency"

            if (answer === correctAnswer) {
                // Increment score
                ++score;
            } else {
                alert("Incorrect")
            }

        } else if (questionNumber === 2) {

            // To get the checkboxes by their name
            const allCheckboxes = document.getElementsByName('chbxChoice');

            // Loop through each checkbox and get the value
            const checkboxValues = [];

            for (let index = 0; index < allCheckboxes.length; index++) {
                // Check if the checkbox is checked
                const checkbox = allCheckboxes[index];
                if (checkbox.checked === true) {
                    const value = checkbox.value;
                    // Add value to the array
                    checkboxValues.push(value.toString());
                }
            }

            // Correct checkbox values
            const correctCheckboxValues = ["Lifestyle Management", "Corporate Concierge", "Private Touring"];

            if (JSON.stringify(checkboxValues) == JSON.stringify(correctCheckboxValues)) {
                // Increment score
                ++score;
            } else {
                alert("Incorrect");
            }

        } else if (questionNumber === 3) {

            // Get the value of the choice choice selected
            const inputAnswerContainer = document.querySelector('#inputAnswer');
            const inputAnswer = inputAnswerContainer.value;

            // Check if inputAnswer is null
            if (inputAnswer === "") {

                // Set style to highlight error
                alert(inputAnswer)
                inputAnswerContainer.style.borderColor = '2px dashed red';
                return

            } else {

                const correctAnswer1 = "comfort";
                const correctAnswer2 = "Comfort";

                if (inputAnswer === correctAnswer1 || inputAnswer === correctAnswer2) {
                    // Increment score
                    ++score;
                } else {
                    alert("Incorrect")
                }

            }

        } else if (questionNumber === 4) {

            // To get the selected drop down option
            const dropDownOption = document.querySelector('#dropDown').value;

            // Check if the answer is correct
            const correctDropDownAnswer = "Nairobi City";

            if (dropDownOption === correctDropDownAnswer) {
                // Increment Score
                ++score;
            } else {
                alert("Incorrect")
            }

        } else {

            // Code for question 5

        }

        // Get the div that contains the current question
        const currentQuestionDiv = document.getElementById(`qn${questionNumber}`);
        // Hide the current question
        currentQuestionDiv.setAttribute("hidden", "true");

        // Reset choice selected to false
        choiceSelected = false;

        // Increment the questions counter
        questionNumber++;

        // To check if the number of questions are depleted
        if (questionNumber === (MAX_QUESTIONS + 1)) {

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

        } else {

            // To alter the HUD and show user progress
            progressText.innerText = `Question ${questionNumber} of ${MAX_QUESTIONS}`
            progressBar.style.width = `${(questionNumber / MAX_QUESTIONS) * 100}%`
            scoreText.innerText = score;

            // Reveal the next question
            const nextQuestionDiv = document.getElementById(`qn${questionNumber}`);
            nextQuestionDiv.removeAttribute("hidden");

            // Re-hide the next button
            nextButton.setAttribute("hidden", "true");

        }
    }
})