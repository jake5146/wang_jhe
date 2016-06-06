$(document).ready(function(){
	//hide the all pages except for start page at the beginning
	$("canvas").hide();
	$("#info_page").hide();	
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

//draw canvas framework
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 200;
var objectsNum = 10;
var seconds = 5;
//timer variable
var t;
//Current game level (initial value=1)
var level = 1;
/*Set local storage to keep track of users' scores.
 * key: scoreL1, item: list of scores from Level 1.
 * key: scoreL2, item: list of scores from Level 2*/
//localStorage.setItem("scoreL1", []);
//localStorage.setItem("scoreL2", []);

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
	if(y <= 50 || y >= 585){
		speedY = -speedY;
	}
}

var blackhole = document.getElementById("blackhole");
var bluehole = document.getElementById("bluehole");
var purplehole = document.getElementById("purplehole");

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

 	ctx.drawImage(blackhole,200,200,50,50);
	ctx.drawImage(bluehole,400,400,50,50);
	ctx.drawImage(purplehole,300,300,50,50);

	//game page shows up when seconds or # of objects is 0.
	if (seconds <= 0 || objectsNum == 0) {
		//if time is up and at least 1 object remains
		if (objectsNum != 0) {
			//(level1) move to next level
			if(level == 1){
				clearInterval(t);
				//Show game_page after level 1.
				$("canvas").hide();
				$("#info_page").show(nextCallback());
			//(level2) finish game
			}else if(level == 2){
				clearInterval(t);
				//Show finish_page after level 2.
				$("canvas").hide();
				ctx.fillText('2',50,50);
				$("#info_page").show(finishCallback());
			}
		//if no object remains, just finish game
		}else if(objectsNum == 0){
				$("canvas").hide();
				ctx.fillText(level,50,50);
				$("#info_page").show(finishCallback());
		}
	}

	raf = window.requestAnimationFrame(animate);
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

//Move to next level(leve2) when "next" button is pressed.
function nextCallback(){
	document.getElementById("info_level").innerHTML = "Level#1";
	$("#next_button").click(
		function() {
			seconds = 5;
			score = 200;
			objectsNum = 10;
			level = 2;
			$("canvas").fadeTo("fast", 1.0);
			$("#info_page").hide();
		}
	);
	t = setInterval(function(){seconds--;},1000);
}

//Go back to start_page when "finish" button is pressed.
function finishCallback(){
	document.getElementById("info_level").innerHTML = "Level#2";
	document.getElementById("next_button").innerHTML = "FINISH";
	$("#next_button").click(
		function() {
			seconds = 5;
			score = 200;
			level = 1;
			objectsNum = 10;
			$("#info_page").hide();
			$("canvas").hide();
			$("#start_page").show();
		}
	);
}

