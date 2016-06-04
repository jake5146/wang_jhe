
$(document).ready(function(){
	//hide the canvas at the beginning
	$("canvas").hide();
	$("#start_button").click(
		function(){
			//hide start page when button is clicked
			$("#start_page").hide();
			//show canvas
			$("canvas").show();
		});
});

//draw canvas framework
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 200;
var seconds = 60;
drawFramework();

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
	ctx.fillText("Score:",400,35);
	ctx.fillText("seconds",850,35)
	//draw number
	ctx.fillText(score,510,35);
	ctx.fillText(seconds,800,35)

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
	ctx.fillText("PAUSE",672,32);
}

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
	    ctx.moveTo(-10,-15);
	    ctx.lineTo(10,-15);
	    ctx.lineTo(10,15);
	    ctx.lineTo(-10,15);
	    ctx.closePath();
	    ctx.stroke();
	    //spaceship center
	    ctx.fillStyle = "#4A9AB0";
	    ctx.beginPath();
	    ctx.moveTo(0,-10);
	    ctx.lineTo(-5,0);
	    ctx.lineTo(0,10);
	    ctx.lineTo(5,0);
	    ctx.closePath();
	    ctx.fill();
	    //spaceship head
	    ctx.translate(0,-15);
	    ctx.fillStyle = "#706E6E";
	    ctx.beginPath();
	    ctx.arc(0,0,10,Math.PI,0);
	    ctx.fill();
	    //spaceship wings
	    var grd = ctx.createLinearGradient(0,0,0,60);
	    grd.addColorStop(0,"#433DAF");
	    grd.addColorStop(1,"white");
	    ctx.fillStyle = grd;
	    ctx.beginPath();
	    ctx.moveTo(-10,0);
	    ctx.lineTo(-25,30);
	    ctx.lineTo(-10,30);
	    ctx.closePath();
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(10,0);
	    ctx.lineTo(25,30);
	    ctx.lineTo(10,30);
	    ctx.closePath(); 
	    ctx.fill();
	    //spaceship fire
	    ctx.fillStyle = "#D14D38";
	    ctx.translate(0,30);
	    ctx.beginPath();
	    ctx.moveTo(-25,0);
	    ctx.lineTo(-17.5,10);
	    ctx.lineTo(-10,0);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.moveTo(25,0);
	    ctx.lineTo(17.5,10);
	    ctx.lineTo(10,0);
	    ctx.fill();
	    ctx.restore();
	}
};

spaceship.setCoordinate(100,100);
spaceship.draw();


