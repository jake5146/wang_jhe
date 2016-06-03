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
