$(document).ready(function(){
	var selectedAnswers = [];
	var choicesHTML = "";
	var itemNum

	function Item(question, answers, correctanswer, feedback) {
		this.question = question;
		this.answers = answers;
		this.correctanswer = correctanswer;
		this.feedback = feedback;

		this.loadQuestion = function(){
			$(".question").text(this.question);
			console.log(this);
			console.log(this.answers.length);
			$(".responses").text('');
			this.answers.forEach(function(answer) {
				choicesHTML = "<li class='response-option'><i class='fa fa-square-o fa-lg'></i>\n<div>" + answer + "\n</div></li>";
				$(".responses").append(choicesHTML);
			});
		}
	}


	q1 = new Item("How many known species of jellyfish are there?", ["0 to 499", "500 to 999", "1,000 to 1,499", "1,500 to 1,999","2,000 or more"], "2,000 or more","")

	q2 = new Item("Which of the following is the world's biggest jellyfish?",["Black Sea Nettle (<span>Chrysaora achlyos</span>)","Cannonball jellyfish (<span>Stomolophus meleagris</span>)","Lion's mane jellyfish (<span>Cyanea capillata</span>)","Nomura's jellyfish (<span>Nemopilema nomural</span>)"],"Nomura's jellyfish (<span>Nemopilema nomural</span>)","")

	q3 = new Item("True or false? Jellyfish kill more people than sharks do each year.", ["True", "False"], "True","")

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


	/*--- Submit answer ---*/
	$(".submit").click(function(e){
		e.preventDefault();
		saveResponse();
		$(".list-area, .submit, h3, .milestones").fadeOut(1200, loadNextQuestion);
	});

	/*--- Add submitted answer to array ---*/
	function saveResponse(){
		var guess = $(".fa-check-square-o").next().text();
		selectedAnswers.push(guess);
		// var correctRO = quiz[selectedAnswers.length].correctanswer;
		// if (guess == correctRO) {
		// 	// $('.milestones').
		// } else {
		// 	itemNum.feedback = "incorrect";
		// }
	}

});

