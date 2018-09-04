// an array of questions and answers
var questions = [
    {
        question : "Which automaker's logo contains a picture of a horse?",
        a : "Lamborghini", 
        b : "Ferrari",
        c : "Alpha Romeo",
        d : "Ford",
        correctAnswer : "b"
    },
    {
        question : "What was the first Japanese car to be produced in the United States?",
        a : "Honda Accord", 
        b : "Mazda Miata",
        c : "Toyota Camry",
        d : "Nissan Maxima",
        correctAnswer : "a"
    },
    {
        question : "What was the first car to come equipped with anti-lock brakes?",
        a : "Lincoln Continental Mark III", 
        b : "Shelby Cobra",
        c : "BMW 1600",
        d : "Jensen FF",
        correctAnswer : "d"
    },
    {
        question : "What car sold more than one million units in 1965, setting a record that still stands today?",
        a : "Buick Wildcat", 
        b : "Pontiac GTO",
        c : "Ford Thunderbird",
        d : "Chevrolet Impala",
        correctAnswer : "d"
    },
    {
        question : "What year was the Corvette first introduced?",
        a : "1943", 
        b : "1953",
        c : "1963",
        d : "1973",
        correctAnswer : "b"
    },
    {
        question : "What kind of car did Starsky and Hutch drink in the classic television series?",
        a : "Ford Bronco", 
        b : "Ford Thunderbird",
        c : "Ford Gran Torino",
        d : "Ford Ranger",
        correctAnswer : "c"
    }
]

var correctCount = 0;                   // keep track of how many questions the user got right
var timer;                              // holds the interval
var timeRemaining;                      // how much time is left for a question
var questionNumber = 0;                 // current question (in array)
var questionCount = questions.length;   // total questions

var guessedWrong = function() {
    questionNumber++;
    nextQuestion(questionNumber);
}

var guessedRight = function() {
    correctCount++;
    questionNumber++;
    nextQuestion(questionNumber);
}

var changeTimeRemaining = function() {
    timeRemaining--;

    // Place the new time on the page
    $('#time-remaining').text(timeRemaining);

    // if time is done, handle it like the question was answered wrong
    if (!timeRemaining) {
        guessedWrong();
        return;
    }
}

var startTimer = function() {
    clearInterval(timer);
    timer = setInterval(changeTimeRemaining, 1000);
}

var endGame = function() {
    // stop the timer from continuing
    clearInterval(timer);

    // get rid of anything leftover from the last question
    var children = $('#question-body').children();
    children.toArray().forEach(element => {
        $(element).empty();
    });

    // display the results from the quiz
    $('#results').html(
        "<h2>Results</h2>" +
        "<div>Correct: " + correctCount + 
        "<br />Incorrect: " + (questionCount - correctCount)
    );

    $('#reset-game').css('display', 'block');
}

// load the next question onto the page
var nextQuestion = function( id ) {
    if (questionNumber == questionCount) {
        endGame();
        return;
    }

    $('#answer-description').empty();

    var nextQuestion = questions[id];

    timeRemaining = 10;

    $('#question-number').text(questionNumber + 1); // incremented because the array is 0-based
    $('#question').text(nextQuestion.question);
    $('#answerA').text("A. " + nextQuestion.a);
    $('#answerB').text("B. " + nextQuestion.b);
    $('#answerC').text("C. " + nextQuestion.c);
    $('#answerD').text("D. " + nextQuestion.d);

    // start the timer again
    startTimer();
}

// compares the user's guess against the correct answer
var checkGuess = function( guess ) {
    
    if (guess === questions[questionNumber].correctAnswer) {
        $('#answer-description').html(
            "<h3>Congratulations!</h3>" +
            "<p>You guessed correctly</p>" +
            "<img src='assets/images/ferrari_logo.png' style='width: 50%;'"
        );
        setTimeout(guessedRight, 3000);   
    }
    else {
        $('#answer-description').html(
            "<h3>Sorry!</h3>" +
            "<p>You guessed incorrectly... The correct answer was " + 
            questions[questionNumber].correctAnswer + "</p>" +
            "<br /><img src='assets/images/ferrari_logo.png' style='width: 50%;'"
        );
        setTimeout(guessedWrong, 3000);
    }
}

// get the value that the user clicked and check against the correct answer
var handleAnswerClick = function( answer ) {
    checkGuess($(answer).attr('data-value'));
}


// event handlers
$('.answer').on('click', function() {
    handleAnswerClick(this);
});

$('#reset-game').on('click', function() {
    questionNumber = 0;
    $(this).css('display', 'none');
    $('#results').empty();

    nextQuestion(questionNumber);
})

$('#start-game').on('click', function() {
    nextQuestion(questionNumber);
    $(this).css('display', 'none');
})