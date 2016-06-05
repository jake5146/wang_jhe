
//timer variable
var t;
//Current game level (initial value=1)
var level = 1;

$(document).ready(function(){
	//hide the all pages except for start page at the beginning
	
	//@@get rid after finish: code on purpose of testing
	//$("#start_page").hide();
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	
	$("canvas").hide();
	$("#fin_page").hide();
	$("#game_page").hide();
	$("svg").hide();
	
	$("#start_button").click(
		function(){
			//hide start page when button is clicked
			$("#start_page").hide();
			//show canvas
			$("canvas").show();
			//set timer when game starts.
			t = setInterval(function(){seconds--;},1000);
		});
});

//Show game_page after level 1.
function timeUp() {
	$("canvas").fadeTo(10, 0.05);
	$("#game_page").show();
}

//Move to next level(leve2) when "next" button is pressed.
$("#next_button").click(
	function() {
		seconds = 1;
		score = 200;
		level++;
		$("canvas").fadeTo("fast", 1.0);
		$("#game_page").hide();
		t = setInterval(function(){seconds--;},1000);
	}
)

//Show finish_page after level 2.
function finishGame() {
	$("canvas").fadeTo(10, 0.05);
	$("#fin_page").show();
}

//Go back to start_page when "finish" button is pressed.
$("#fin_button").click(
	function() {
		seconds = 1;
		score = 200;
		level--;
		$("#fin_page").hide();
		$("canvas").fadeTo("fast", 1.0);
		$("canvas").hide();
		$("#start_page").show();
	}
)


//draw canvas framework
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 200;
var seconds = 1;

//spaceship 50px*50px
var spaceship = {
	x:0,
	y:0,
	setCoordinate:function(x,y){
		this.x = x;
		this.y = y;
	},
	draw:function(){
		//spaceship body
	    ctx.save();
	    ctx.translate(this.x,this.y);
	    ctx.beginPath();
	    ctx.moveTo(-10,15);
	    ctx.lineTo(10,15);
	    ctx.lineTo(10,45);
	    ctx.lineTo(-10,45);
	    ctx.closePath();
	    ctx.stroke();
	    //spaceship center
	    ctx.fillStyle = "#4A9AB0";
	    ctx.beginPath();
	    ctx.moveTo(0,20);
	    ctx.lineTo(-5,30);
	    ctx.lineTo(0,40);
	    ctx.lineTo(5,30);
	    ctx.closePath();
	    ctx.fill();
	    //spaceship head
	    ctx.translate(0,0);
	    ctx.fillStyle = "#706E6E";
	    ctx.beginPath();
	    ctx.arc(0,15,10,Math.PI,0);
	    ctx.fill();
	    //spaceship wings
	    var grd = ctx.createLinearGradient(0,0,0,60);
	    grd.addColorStop(0,"#433DAF");
	    grd.addColorStop(1,"white");
	    ctx.fillStyle = grd;
	    ctx.beginPath();
	    ctx.moveTo(-10,15);
	    ctx.lineTo(-25,45);
	    ctx.lineTo(-10,45);
	    ctx.closePath();
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(10,15);
	    ctx.lineTo(25,45);
	    ctx.lineTo(10,45);
	    ctx.closePath(); 
	    ctx.fill();
	    //spaceship fire
	    ctx.fillStyle = "#D14D38";
	    ctx.translate(0,30);
	    ctx.beginPath();
	    ctx.moveTo(-25,15);
	    ctx.lineTo(-17.5,25);
	    ctx.lineTo(-10,15);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(25,15);
	    ctx.lineTo(17.5,25);
	    ctx.lineTo(10,15);
	    ctx.fill();
	    ctx.restore();
	}
};

//random assortment of 10 objects
var x = Math.floor(Math.random()*900+50);
var y = Math.floor(Math.random()*540+50);
spaceship.setCoordinate(x,y);
//random direction
var speed = 8;
var angle = Math.floor(Math.random()*2*Math.PI);
var speedX;
var speedY;
polarToRect(speed,angle);


function polarToRect(speed,angle){
	speedX = speed*Math.cos(angle);
	speedY = speed*Math.sin(angle);
}


//border check
function borderCheck(x,y){
	if(x <= 25 || x >= 975){
		speedX = -speedX;
	}
	if(y <= 50 || y >= 615){
		speedY = -speedY;
	}
}

//animation
var raf;
var running = true;

function animate(){
	ctx.clearRect(0,0,1000,640);
	drawFramework();
	drawPauseButton();
	//add speed
	spaceship.x += speedX;
	spaceship.y += speedY;
	borderCheck(spaceship.x,spaceship.y);
	spaceship.draw();
	raf = window.requestAnimationFrame(animate);
	//game page shows up when seconds or score is 0.
	if (seconds <= 0 || score <= 0) {
		if (level == 1) {
			clearInterval(t);
			timeUp();
		} else if (level == 2) {
			clearInterval(t);
			finishGame();
		}
	}
}


function drawFramework(){
	//draw menu line
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(0,50);
	ctx.lineTo(1000,50);
	ctx.stroke();
	//draw text
	ctx.font = "35px sans-serif";
	ctx.fillText(" Level #", 5, 35);
	ctx.fillText(level, 130, 35);
	ctx.fillText("Score:",400,35);
	ctx.fillText("seconds",850,35)
	//draw number
	ctx.fillText(score,510,35);
	ctx.fillText(seconds,800,35)
}

function drawPauseButton() {
	ctx.clearRect(649, 9, 102, 32);
	//Pause button
	ctx.beginPath();
	ctx.moveTo(650,10);
	ctx.lineTo(750,10);
	ctx.lineTo(750,40);
	ctx.lineTo(650,40);
	ctx.closePath();
	ctx.stroke();
	//Pause text
	ctx.font = "17px sans-serif";
	if (running == false) {
		ctx.fillText("RESUME",665,32);
	}
	if (running == true) {
		ctx.fillText("PAUSE",672,32);
	}
}



//if pause is clicked
canvas.addEventListener("click",function(e){
	if(e.clientX > 650 && e.clientX < 750 && e.clientY > 10 && 
		e.clientY < 40 && running == true){	
		//stop animation
		window.cancelAnimationFrame(raf);
		//stop counting time
		clearInterval(t);
		//clear running
		running = false;
		//Change "pause" text to "resume" when game is paused.
		drawPauseButton();
		//interval between two clicks
		sleep(50);
	}
	if(e.clientX > 650 && e.clientX < 750 && e.clientY > 10 && 
		e.clientY < 40 && running == false){	
		raf = window.requestAnimationFrame(animate);
		t = setInterval(function(){seconds--;},1000);
		running = true;
		//Change "resume" text to "pause" when game is running.
		drawPauseButton();
		//interval between two clicks
		sleep(50);

	}
});

animate();
