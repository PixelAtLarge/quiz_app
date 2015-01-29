$(document).ready(function(){
	var selectedAnswers = [];
	var choicesHTML = "";
	var count;
	var guess;
	var milestone = $(".milestones").children();
	var scores = [];
	var score;

	function Item(question, answers, correctanswer, feedback) {
		this.question = question;
		this.answers = answers;
		this.correctanswer = correctanswer;
		this.feedback = feedback;

		this.loadQuestion = function(){
			$(".question").text(this.question);
			$(".responses").text('');
			this.answers.forEach(function(answer) {
				choicesHTML = "<li class='response-option'><i class='fa fa-square-o fa-lg'></i>\n<div>" + answer + "\n</div></li>";
				$(".responses").append(choicesHTML);
			});
			$(".correctRO").text(this.correctanswer);
				$(milestone[selectedAnswers.length]).find("i").removeClass("fa-square-o").addClass("fa-square");
			updateCount();
		}
	}

	q1 = new Item("How many known species of jellyfish are there?", ["0 to 499", "500 to 999", "1,000 to 1,499", "1,500 to 1,999","2,000 or more"], "2,000 or more","")

	q2 = new Item("Which of the following is the world's biggest jellyfish?",["Black Sea Nettle (<span>Chrysaora achlyos</span>)","Cannonball jellyfish (<span>Stomolophus meleagris</span>)","Lion's mane jellyfish (<span>Cyanea capillata</span>)","Nomura's jellyfish (<span>Nemopilema nomural</span>)"],"Nomura's jellyfish (Nemopilema nomural)","")

	q3 = new Item("True or false? Jellyfish kill more people than sharks each year.", ["True", "False"], "True","")

	q4 = new Item("What is the top of the jellyfish that looks like a mushroom top called?", ["Bell", "Bulb", "Body", "Cortex", "Head"], "Bell","")

	q5 = new Item("True or false? A jellyfish stinger can shoot out faster than a bullet from a gun.", ["True", "False"], "True","")

	var quiz = [q1, q2, q3, q4, q5];

	/*--- Start quiz ---*/
	$(".begin-quiz").click(function(e){
		e.preventDefault();
		$(".begin-quiz, .jellyfish-image").fadeOut(1200,loadNextQuestion);
	});

	function loadNextQuestion(){
		quiz[selectedAnswers.length].loadQuestion();
		$("h1, .list-area, .submit, h3, .milestones").fadeIn(1200);
		$("i").on("click", markAnswer);
	}

	function markAnswer(){
		if($(this).hasClass("fa-square-o")) {
			$(this).removeClass("fa-square-o").addClass("fa-check-square-o");
		} else {
			$(this).removeClass("fa-check-square-o").addClass("fa-square-o");
		}
	}

	function updateCount(){
		var count = 1 + selectedAnswers.length;
		$(".count span").text(count);
	} 

	/*--- Submit answer ---*/
	$(".submit").click(function(e){
		e.preventDefault();
		saveResponse();
		calculateScore();
		if (scores.length < quiz.length) {
			$(".list-area, .submit, h3, .milestones").fadeOut(1200, loadNextQuestion);
		} else{
			$(".score").text("Your score is: " + scores[scores.length-1] + " %");
			$(".list-area, .submit, h3, .milestones").fadeOut(800, showScore);
		};
	});

	function calculateScore(){
		var numCorrect = 0;
		$(".milestones").children().each(function(index, elem) {
    		numCorrect += $(this).find(".fa-check-square-o").length;
    	})
    	var score = numCorrect / quiz.length * 100;
    	// console.log("this is your score: " + score + " %")
    	scores.push(score);
	}

	function showScore(){
		$(".jellyfish-image").fadeIn(1200);
		$(".score").fadeIn(1200);
	}

	/*--- Add submitted answer to array ---*/
	function saveResponse(){
		var guess = $(".fa-check-square-o").next().text().trim();
		selectedAnswers.push(guess);
		var correctAnswer = $("h4").text();
		if (guess == correctAnswer) {
			$(milestone[selectedAnswers.length-1]).find("i").removeClass("fa-square").addClass("fa-check-square-o");
		} else {
			$(milestone[selectedAnswers.length-1]).find("i").removeClass("fa-square").addClass("fa-minus-square-o");
		};
	}

});
