$(document).ready(function(){
	//hide the all pages except for start page at the beginning
	//@@get rid after finish: code on purpose of testing
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
			interval = setInterval(createHole,createHoleInterval);
		});
});

//draw canvas framework
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 200;
var objectsNum = 10;
var seconds = 60;
//timer variable
var t;
//Current game level (initial value=1)
var level = 1;
/*Set local storage to keep track of users' scores.
 * key: scoreL1, item: list of scores from Level 1.
 * key: scoreL2, item: list of scores from Level 2*/
localStorage.setItem("scoreL1", []);
localStorage.setItem("scoreL2", []);

//spaceship 50px*50px
var spaceship = {
	x:0,
	y:0,
	vx:0,
	vy:0,
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
var speed = 5;
var angle = Math.floor(Math.random()*2*Math.PI);
polarToRect(speed,angle);

function polarToRect(speed,angle){
	spaceship.vx = speed*Math.cos(angle);
	spaceship.vy = speed*Math.sin(angle);
}

//border check
function borderCheck(x,y){
	if(x + spaceship.vx <= 25 || x + spaceship.vx>= 975){
		spaceship.vx = -spaceship.vx;
	}
	if(y + spaceship.vy <= 50 || y + spaceship.vy >= 585){
		spaceship.vy = -spaceship.vy;
	}
}

//hole properties
var blackhole = document.getElementById("blackhole");
var bluehole = document.getElementById("bluehole");
var purplehole = document.getElementById("purplehole");
//disappears after eating # of obj
var BLACKDIS = 1;
var PURPLEDIS = 2;
var BLUEDIS = 3;
//points if clicked
var BLACKP = 20;
var PURPLEP = 10;
var BLUEP = 5;
//pull speed
var BLUEPS = 'slow';
var PURPLEPS = 'medium';
var BLACK = 'fast';
//define hole object
function hole(x,y,type){
	this.x = x;
	this.y = y;
	this.type = type; //1 for bluehole 2 for purplehole 3 for blackhole
	objEat = 0; 
}
//draw hole on canvas
function drawHole(holeObject){
	if(holeObject.type == 1){
		ctx.drawImage(bluehole,holeObject.x,holeObject.y,50,50);
	}else if(holeObject.type == 2){
		ctx.drawImage(purplehole,holeObject.x,holeObject.y,50,50);
	}else{
		ctx.drawImage(blackhole,holeObject.x,holeObject.y,50,50);
	}
}

//hole array
var holeArr = [];
//random create holes every HOLEINTERVAL
var interval;
var createHoleInterval = 1000;
function createHole(){
	var ram = Math.random();
	var ramX;
	var ramY;
	
	if(ram <= 0.15){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*540+50);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*540+50);
	    }
		holeArr.push(new hole(ramX,ramY,3));
	}

	ram = Math.random();

	if(ram <= 0.3){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*540+50);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*540+50);
	    }
		holeArr.push(new hole(ramX,ramY,2));
	}

	ram = Math.random();

	if(ram <= 0.5){
		ramX = Math.floor(Math.random()*900+50);
	    ramY = Math.floor(Math.random()*540+50);
	    //check overlap
	    while(!checkOverlap(ramX,ramY)){
	    	ramX = Math.floor(Math.random()*900+50);
	    	ramY = Math.floor(Math.random()*540+50);
	    }
		holeArr.push(new hole(ramX,ramY,1));
	}
}

function checkOverlap(ramX,ramY){
	for(var i = 0;i < holeArr.length;i++){
		if(ramX >= holeArr[i].x-100 && ramX <= holeArr[i].x+100 
			&& ramY <= holeArr[i].y+100 && ramY >= holeArr[i].y-100){
			return false;
		}
	}
	return true;
}

function drawHoleArr(){
	for(var i = 0;i < holeArr.length;i++){
		drawHole(holeArr[i]);
	}
}
var dx;
var dy;
function pullObject(){
	//check list of objects!!
	//here just use one object as example!!
	for(var i = 0;i < holeArr.length;i++){
		if(spaceship.x <= holeArr[i].x+75 && spaceship.x >= holeArr[i].x-75 
			&& spaceship.y <= holeArr[i].y+75 && spaceship.y >= holeArr[i].y-75){
			//inside the event horizon
			dx = holeArr[i].x - spaceship.x + 25;
			dy = holeArr[i].y - spaceship.y;
			spaceship.vx = 0;
			spaceship.vy = 0;
			if(dx > 0){
				spaceship.x++;
			}
			if(dx < 0){
				spaceship.x--;
			}
			if(dy > 0){
				spaceship.y++;
			}
			if(dy < 0){
				spaceship.y--;
			}
			if(dx<=1 && dy<=1){
				//disappear
				spaceship = 0;
				holeArr[i].objEat++;
				//check # of obj eaten
			}
		}
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
	spaceship.x += spaceship.vx;
	spaceship.y += spaceship.vy;
	borderCheck(spaceship.x,spaceship.y);
	
	if(spaceship != 0){
		spaceship.draw();
	}

	//create blackhole
	drawHoleArr();
	pullObject();

	//game page shows up when seconds or # of objects is 0.
	if (seconds == 0 || objectsNum == 0) {
		holeArr.length = 0;
		clearInterval(interval);
		//if time is up and at least 1 object remains
		if (seconds == 0 && objectsNum != 0) {
			//(level1) move to next level
			if(level == 1){
				clearInterval(t);
				//Show game_page after level 1.
				$("canvas").hide();
				$("#game_page").show(nextCallback());
			//(level2) finish game
			}else if(level == 2){
				clearInterval(t);
				//Show finish_page after level 2.
				$("canvas").hide();
				$("#fin_page").show(finishCallback());
			}
		//if no object remains, just finish game
		}else if(objectsNum == 0){
				$("canvas").hide();
				$("#fin_page").show(finishCallback());
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
	$("#next_button").click(
		function() {
			seconds = 60;
			score = 200;
			objectsNum = 10;
			level = 2;
			$("canvas").fadeTo("fast", 1.0);
			$("#game_page").hide();
		}
	);
	t = setInterval(function(){seconds--;},1000);
	interval = setInterval(createHole,createHoleInterval);
}

//Go back to start_page when "finish" button is pressed.
function finishCallback(){
	$("#fin_button").click(
		function() {
			seconds = 60;
			score = 200;
			level = 1;
			objectsNum = 10;
			$("#fin_page").hide();
			$("canvas").fadeTo("fast", 1.0);
			$("canvas").hide();
			$("#start_page").show();
		}
	);
}

