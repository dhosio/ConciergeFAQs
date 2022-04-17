// Global Variables
let choiceSelected = false;
const MAX_QUESTIONS = 5;
const QUESTION_SCORE = 1;
// Styling colors
let wrongBackgroundColor = '#c50505'; //Red
let correctBackgroundColor = '#7cb918'; //Green


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
    let selectedBackgroundcolor = '#50473ed2'; //Dark grey
    currentDiv.setAttribute("style", `background-color: ${selectedBackgroundcolor}; color: white; font-weight:bold;`);

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
let nextButton = document.querySelector('#nextButton');

// Variable to hold the question number and score
let questionNumber = 1;
let score = 0;

// Setting an event listener to the 'Check' Button
let checkButtons = document.querySelectorAll('.checkButton');

// Event Listener
for (let checkButton of checkButtons) {

    checkButton.addEventListener('click', event => {
        // Prevent refreshing
        event.preventDefault();

        // To check the answers put by the user
        if (!choiceSelected) {

            // Sweet Alert to show choice not selected
            swal({
                title: 'Error!',
                text: 'You must select at least one choice before proceeding',
                icon: 'error',
                button: 'Try again'
            })

        } else {

            if (questionNumber === 1) {

                // Get the answer selected by the user
                // const currentForm = document.forms.qn1ChoiceForm;
                // const chosenAnswer = currentForm.elements.choice.value;

                // Getting the value of the selected radio button
                const answer = document.querySelector('input[name="choice"]:checked')
                const answerValue = answer.value;

                // Check if the chossen answer is correct
                let correctAnswer = "Dhosio Regency"

                if (answerValue === correctAnswer) {
                    // Highlight selected choice
                    answer.parentElement.parentElement.classList.add('correct')
                    // Increment score
                    ++score;
                } else {
                    answer.parentElement.parentElement.classList.add('incorrect')
                }

            } else if (questionNumber === 2) {

                // To get the checkboxes by their name
                const allCheckboxes = document.getElementsByName('chbxChoice');

                // Correct checkbox values
                const correctCheckboxValues = ["Lifestyle Management", "Corporate Concierge", "Private Touring"];
                // Loop through each checkbox and get the value
                const checkboxValues = [];

                for (let index = 0; index < allCheckboxes.length; index++) {
                    // Check if the checkbox is checked
                    const checkbox = allCheckboxes[index];
                    const correctAnswer = correctCheckboxValues[index];

                    if (checkbox.checked === true) {
                        const value = checkbox.value;
                        // Compare the value to the correct answer
                        if (value === correctAnswer) {
                            checkbox.parentElement.parentElement.classList.add('correct');
                            // Add value to the array
                            checkboxValues.push(value.toString());
                        } else {
                            checkbox.parentElement.parentElement.classList.add('incorrect');
                        }
                    }
                }

                // Check if all answer match the correct answers
                if (JSON.stringify(checkboxValues) === JSON.stringify(correctCheckboxValues)) {
                    // Increment score
                    ++score;
                } else {

                }

            } else if (questionNumber === 3) {

                // Get the value of the checked item
                let answer = document.querySelector('input[name="inputChoice"]:checked');
                const answerValue = answer.value;

                // Get the input container and put the answer selected
                const inputAnswerContainer = document.getElementById('inputAnswer');
                inputAnswerContainer.value = answerValue;

                // Confirm that answer is correct
                const correctAnswer = "Comfort";
                if (answerValue === correctAnswer) {
                    answer.parentElement.parentElement.classList.add('correct');
                    // Then increment score
                    ++score;
                } else {
                    answer.parentElement.parentElement.classList.add('incorrect');
                }

            } else if (questionNumber === 4) {

                // To get the selected drop down option
                const dropDown = document.querySelector('#dropDown');
                const dropDownValue = dropDown.value;

                // Check if the answer is correct
                const correctDropDownAnswer = "Nairobi City";

                if (dropDownValue === correctDropDownAnswer) {
                    // Make parent element the correct answer
                    dropDown.classList.add('correct');
                    dropDown.parentElement.classList.add('correct');
                    // Increment Score
                    ++score;
                } else {
                    // Make parent element incorrect answer
                    dropDown.classList.add('incorrect');
                    dropDown.parentElement.classList.add('incorrect');
                }

            } else if (questionNumber === 5) {

                // Getting the value of the selected radio button
                const dropAnswer = document.querySelector('input[name="dropChoice"]:checked')
                const dropAnswerValue = dropAnswer.value;

                // Check if the chossen answer is correct
                let correctDropAnswer = "Snapchat";

                if (dropAnswerValue === correctDropAnswer) {
                    // Highlight selected choice
                    dropAnswer.parentElement.parentElement.classList.add('correct')
                    // Increment score
                    ++score;
                } else {
                    dropAnswer.parentElement.parentElement.classList.add('incorrect')
                }

            } else {

                // End all
                return

            }

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

// HUD to show user progress
let progressText = document.querySelector('#progressText')
let progressBar = document.querySelector('#progressBarFull')
let scoreText = document.querySelector('#score')

// Adding the event listener
nextButton.addEventListener('click', (event) => {

    // Prevent page from reloading
    event.preventDefault();

    // Get the div that contains the current question
    const currentQuestionDiv = document.getElementById(`qn${questionNumber}`);
    // Hide the current question
    currentQuestionDiv.setAttribute("hidden", "true");

    // Reset choice selected to false
    choiceSelected = false;

    // Update the score
    scoreText.innerText = score;

    // Increment the questions counter
    questionNumber++;

    // To alter the HUD and show user progress
    progressText.innerText = `Question ${questionNumber} of ${MAX_QUESTIONS}`
    progressBar.style.width = `${(questionNumber / MAX_QUESTIONS) * 100}%`

    // To check if the number of questions are depleted
    if (questionNumber === (MAX_QUESTIONS + 1)) {

        // Change question progress text to maximum
        progressText.innerText = `Question ${MAX_QUESTIONS} of ${MAX_QUESTIONS}`

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

        // End all
        return;

    }

    // Reveal the next question
    const nextQuestionDiv = document.getElementById(`qn${questionNumber}`);
    nextQuestionDiv.removeAttribute("hidden");

    // Re-hide the next button
    nextButton.setAttribute("hidden", "true");

})