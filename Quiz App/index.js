const questions = [
    {
        question: "Which is the largest city in Pakistan?",
        answers: [
            { text: "Lahore", correct: false },
            { text: "Karachi", correct: true },
            { text: "Islamabad", correct: false },
            { text: "Quetta", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers: [
            { text: "Europe", correct: false },
            { text: "Russia", correct: true },
            { text: "Africa", correct: false },
            { text: "China", correct: false },
        ]
    },
    {
        question: "Which river is the longest in the world?",
        answers: [
            { text: "Indus", correct: false },
            { text: "Mekong", correct: false },
            { text: "Nile", correct: true },
            { text: "Amazon", correct: false },
        ]
    },
    {
        question: "Which desert is the largest in the world?",
        answers: [
            { text: "Sahara Desert", correct: false },
            { text: "Gobi Desert", correct: false },
            { text: "Arabian Desert", correct: true },
            { text: "Syrian Desert", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; 
    showQuestion();
}

// Show the current question and answer options
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Create a button for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct"); 
        score++;
    } else {
        selectedBtn.classList.add("incorrect"); 
    }

    // Disable all buttons after one answer is selected
    Array.from(answerButton.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    // Show the "Next" button after selecting an answer
    nextButton.style.display = "block";
}

// Show final score
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Move to the next question or end the quiz
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); 
    }
});


startQuiz();

