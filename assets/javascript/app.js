
var panel = $("#quiz-area");
var countStartNumber = 30;


var questions = [{
  question: "Who is Fastes Super Hero?",
  answers: ["SuperMan", "Flash", "Iron Man", "Balck Panther"], 
  correctAnswer: "Flash",
  image: src="https://media.giphy.com/media/m2tOKbpjpFMvm/giphy.gif"
}, {
  question: "Who is Luke SkyWalker ?",
  answers: ["Storm Trooper", "Jedi", "Robot", ],
  correctAnswer: "Jedi",
  image: src="https://www.speakgif.com/wp-content/uploads/2015/11/star-wars-the-phanthom-menace-obi-wan-help-animated-gif.gif"
}, {
  question: "Whats the Name of the movie about Big Roaches",
  answers: ["Men In Black", "Starship Troopers", "Mutants", "Pirania"],
  correctAnswer: "Starship Troopers",
  image: src="https://i.pinimg.com/originals/a9/a7/d7/a9a7d776bbfb6869ee1e9f014d67ddd5.gif"
}, {
  question: "Which song was sing by Roling Stones?",
  answers: ["Yesterday", "Every Breaking Wave", "Gimme a Shelter", "Numb"],
  correctAnswer: "Gimme a Shelter",
  image: src="https://i.pinimg.com/originals/ab/f3/e8/abf3e89d38a57111bab50f6cd301556b.gif"
}, {
  question: "What was the name of Spider Man",
  answers: ["Harry Osborne", "Clark Kent", "Eddie Brooke", "Peter Parker"],
  correctAnswer: "Peter Parker",
  image: src="https://steamusercontent-a.akamaihd.net/ugc/268345016172244229/2378809E494C75B60672C9F5273060313E6A1EB4/"
}, {
  question: "Who is Main Singer in Beatles?",
  answers: ["Michael Jackson", "John Lenon", "Frank Senatra", "2Chainz"],
  correctAnswer: "John Lenon",
  image: src="https://media1.tenor.com/images/a0a0afe04db5a0f1a58aa581b6df0c6f/tenor.gif?itemid=8356418"
}, {
  question: "What was the Cyclop's ability in X-Men? ",
  answers: ["Fly", "Laser Beam", "Storm", "Teleport"],
  correctAnswer: "Laser Beam",
  image: src="https://media1.tenor.com/images/195f2fe3c94413b003e871991bb07b44/tenor.gif?itemid=7486754"
}, {
  question: "What is the name of Iron Man?",
  answers: ["Peter Parker", "Bruce Wayne", "Tony Stark", "Eddie Brooke"],
  correctAnswer: "Tony Stark",
  image: src="https://media1.tenor.com/images/80eb9c353ee40c8abf95e508bf8ce3ea/tenor.gif?itemid=7371460"
}];


var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>All done, here's how you did!</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};



$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
