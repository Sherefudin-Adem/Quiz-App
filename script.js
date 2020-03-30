const $ = document.getElementById.bind(document);

//file quiz_controller
function Quiz(questions) {
    this.point = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getIndex = function () {
    return this.questions[this.index];
};

Quiz.prototype.guess = function (answer) {
    if (this.getIndex().isCorrectAnswer(answer)) {
        this.point++;
    }

    this.index++;
};

Quiz.prototype.isEnded = function () {
    return this.index === this.questions.length;
};

//file questions

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

// file display
function display() {
    if (quiz.isEnded()) {
        showPoints();
    } else {
        // show question
        const element = $("question");
        element.innerHTML = quiz.getIndex().text;

        // show options
        const choices = quiz.getIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            const element = $("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    const button = $(id);
    button.onclick = function () {
        quiz.guess(guess);
        display();
    }
}


function showProgress() {
    const currentNumber = quiz.index + 1;
    const element = $("progress");
    element.innerHTML = `Question:  ${currentNumber } of ${quiz.questions.length}`;
}

function showPoints() {
    let gameOver = "<h1>Result</h1>";
    gameOver += `<h2 id='score'> Your Answer: ${quiz.point }</h2>`;
    const element = $("quiz");
    element.innerHTML = gameOver;
}

// create questions

const questions = [
    new Question("Do you love to code in Javascript?", ["No", "Yes", "Yeah, of course", "No"], "Yeah, of course"),
    new Question("What's the best programming language for the web?", ["Javascript", "C#", "Php", "Python"], "Javascript"),
    new Question("Is Javascript Awesome?", ["Yes", "No", "Maybe", "It's okay"], "Yes")
];
      
//create quiz
const quiz = new Quiz(questions);

// display quiz
display();