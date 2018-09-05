// an array of questions and answers
var questions = [
    {
        question : "Which automaker's logo contains a picture of a horse?",
        a : "Lamborghini", 
        b : "Ferrari",
        c : "Alpha Romeo",
        d : "Ford",
        correctAnswer : "b",
        image : "assets/images/ferrari_logo.png"
    },
    {
        question : "What was the first Japanese car to be produced in the United States?",
        a : "Honda Accord", 
        b : "Mazda Miata",
        c : "Toyota Camry",
        d : "Nissan Maxima",
        correctAnswer : "a",
        image : "assets/images/honda_accord.jpg"
    },
    {
        question : "What was the first car to come equipped with anti-lock brakes?",
        a : "Lincoln Continental Mark III", 
        b : "Shelby Cobra",
        c : "BMW 1600",
        d : "Jensen FF",
        correctAnswer : "d",
        image : "assets/images/jensen_ff.jpg"

    },
    {
        question : "What car sold more than one million units in 1965, setting a record that still stands today?",
        a : "Buick Wildcat", 
        b : "Pontiac GTO",
        c : "Ford Thunderbird",
        d : "Chevrolet Impala",
        correctAnswer : "d",
        image : "assets/images/chevy_impala.jpg"
    },
    {
        question : "What year was the Corvette first introduced?",
        a : "1943", 
        b : "1953",
        c : "1963",
        d : "1973",
        correctAnswer : "b",
        image : "assets/images/1953_corvette.jpg"
    },
    {
        question : "What kind of car did Starsky and Hutch drink in the classic television series?",
        a : "Ford Bronco", 
        b : "Ford Thunderbird",
        c : "Ford Gran Torino",
        d : "Ford Ranger",
        correctAnswer : "c",
        image : "assets/images/starsky_gran_torino.jpg"
    }
]

var correctCount = 0;                   // keep track of how many questions the user got right
var timer;                              // holds the interval
var timeRemaining;                      // how much time is left for a question
var questionNumber = 0;                 // current question (in array)
var questionCount = questions.length;   // total questions

var guessedWrong = function(message) {
    // display some info
    $('#answer-description').html(
        // "<h3>Sorry!</h3>" +
        // "<p>You guessed incorrectly... The correct answer was " + 
        // questions[questionNumber].correctAnswer + "</p>" +
        // "<br /><img src='assets/images/ferrari_logo.png' style='width: 50%;'"

        "<h3>" + message + "</h3>" +
        "<div style='height:200px;width: 60%;margin: 0 auto;padding-top: 10px;background-color: rgba(0,0,0,0.25)'>" + 
            "<div style='float: left;width: 50%;height:200px;'><img src=" + questions[questionNumber].image + " style='height:180px;'></div>" +
            "<div style='float:left;width: 50%;margin-top: 75px;'>" +
                "<h6>Unfortunately the correct answer was " + questions[questionNumber][questions[questionNumber].correctAnswer] + "</h6>" + 
            "</div>" +
        "</div>"
    );

    questionNumber++;

    setTimeout(nextQuestion, 3000);
}

var guessedRight = function() {
    // display some info
    $('#answer-description').html(
        "<h3>Congratulations!</h3>" +
        "<div style='height:200px;width: 60%;margin: 0 auto;padding-top: 10px;background-color: rgba(0,0,0,0.25)'>" + 
            "<div style='float: left;width: 50%;'><img src=" + questions[questionNumber].image + " style='height:180px;'></div>" +
            "<div style='float:left;width: 50%;margin-top: 75px;'>" +
                "<h6>The correct answer was " + questions[questionNumber][questions[questionNumber].correctAnswer] + "</h6>" + 
            "</div>" +
        "</div>"
    );

    correctCount++;
    questionNumber++;

    setTimeout(nextQuestion, 3000);
}

var changeTimeRemaining = function() {
    timeRemaining--;

    // Place the new time on the page
    $('#time-remaining').text(timeRemaining);

    // if time is done, handle it like the question was answered wrong
    if (!timeRemaining) {
        clearInterval(timer);
        guessedWrong("Times Up!");
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
var nextQuestion = function( ) {
    if (questionNumber == questionCount) {
        endGame();
        return;
    }

    $('#answer-description').empty();

    var nextQuestion = questions[questionNumber];

    timeRemaining = 15;     // set the timer to 15 seconds for each question

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
    // stop the timer while this message is displayed
    clearInterval(timer);
    
    if (guess === questions[questionNumber].correctAnswer) {
        guessedRight();        
    }
    else {
        guessedWrong("Sorry!");
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
    correctCount = 0;
    $(this).css('display', 'none');
    $('#results').empty();

    nextQuestion(questionNumber);
})

$('#start-game').on('click', function() {
    nextQuestion(questionNumber);
    $(this).css('display', 'none');
    $('#question-count').text(' / ' + questions.length);
})