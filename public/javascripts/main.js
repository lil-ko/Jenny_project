var picOrder = [1,2,3,4];
var index = picOrder.length - 1;
var userResult = [];
console.log('Pic order before sort ' + picOrder);

function savePositive(picNum){
	userResult[picNum-1] = ("Yes");	
	console.log(userResult);
	index--;
	
	if (index >= 0) {

		$(document).ready(function(){
			$("div#" + picNum + "picChange").addClass("hidden");
			$("div#userReady").removeClass("hidden");
		});
	} else {
			endOfTest();
		}
}

function saveNegative(picNum){
	userResult[picNum-1] = ("No");	
	console.log(userResult);
	index--;
	if (index >= 0) {

		$(document).ready(function(){
			$("div#" + picNum + "picChange").addClass("hidden");
			$("div#userReady").removeClass("hidden");
		});	
	} else {
			endOfTest();
		}
}

function beginTest(){
	picOrder.sort(function(a, b){return 0.5 - Math.random()});
	console.log('Pic order after sort ' + picOrder);
	$(document).ready(function(){
        $("p.intro").hide(500);
		$("h3.intro").hide(500);
		$("button#startEx").hide(500);
		$("div#userReady").removeClass("hidden");
	});	
}

function readyForNext(){
	console.log("at the beginning of the function index is " + index);
	if (index >= 0) {
	picNumber = picOrder[index];
	$(document).ready(function(){
   		$("div#userReady").addClass("hidden");
		$("div#" + picNumber + "pic").removeClass("hidden");
		setTimeout(function() {
			$("div#placeholder").removeClass("hidden");
			$("div#" + picNumber + "pic").addClass("hidden");
				setTimeout(function() {
					$("div#placeholder").addClass("hidden");
					$("div#" + picNumber + "picChange").removeClass("hidden");
					}, 500);	
			}, 500);

		});
		console.log("index became " + index);
		} else {
			endOfTest();
		}	
}

function endOfTest(){
	console.log("picNumber " + picNumber);
	$(document).ready(function(){
		$("div#placeholder").addClass("hidden");
	 	$("div#userReady").addClass("hidden");
	    $("div#doneMsg").removeClass("hidden");
		$("div#" + picNumber + "picChange").addClass("hidden");
	});
	var userResStr = new String();
	var i;
	for (i=0; i<4; i++){
		userResStr = userResStr + userResult[i] + ",";
	}
	$(document).ready(function(){
			$.post("http://localhost:8000/",
			{
				userResStr: userResStr
			});
		});
	console.log("index became " + index);
	console.log("and we're passing to server: " + userResult);
}
























































