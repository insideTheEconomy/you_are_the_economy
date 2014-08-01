// JavaScript Document
var chipicons=['bicycle','shopping','school','transportation','dog','daycare','vacation','restaurant','paint','soccer','movie','golf','game','garden','doctor'],flippoolIDs = new Array(),flippediconIDs = new Array(), iconButtons=new Array(), flipaxis = ['Xaxis', 'Yaxis'], jsonObj = {}, gui;

var chosen="", flipflop=false, visibiltyAccess=false, inactivityTimer, timerCallback, inactivityCount=0, countDown=0, inactivityAlertVisible = false, inactivityTolerance= 30, fliprate=1200, attractIsPlaying= false, currentID, flipInterval,jsonObj,jsObj; 

//$( document ).ready(initializeMe());
function initializeMe() {
	$( document ).ready(function() {
		//document.getElementById("fullscreen").webkitRequestFullScreen;
		
		var gui = require('nw.gui');
		gui.Window.get().enterKioskMode();



		// Handler for .ready() called.
		flippoolIDs = chipicons.slice(0);
	  $.support.cors = true;
		$.getJSON('yate.json?t='+ new Date().getTime(),{ format: "json" })
		.fail(function() { console.log( "error" ); })
		.done(function(data){
			jsonObj = data;
			jsObj = $.parseJSON( jsonObj );
			console.log("Success");
			$('#title').html(jsonObj[0].title);
			$('h1').text(jsonObj[0].actTitle);
			$('h2').text(jsonObj[0].calltoAct);
			fliprate = Number(jsonObj[0].fliprate);
		  flipInterval = setInterval(function(){ flipicon(); },fliprate);
			$('h3').each(function( index, element ) {
				$(element).html(jsonObj[0].activitySet[index].buttonText);
			});
		});
		//setTimeout( function(){ $("body").on('mousemove click', function(e){ resetInactivityTimer() }); }, 500 );
		
		$('#visualaccess').on('mousedown', function(e){ clickA.play()} );
		$('#visualaccess').on('mouseup', function(e){ toggleVisibility()} );
		
		$('body').bind('keypress', function(e) {
			if (e.which == 113){ //'q'
				gui.App.quit();
			} else if (e.which == 119) { //'w'
				gui.Window.get().leaveKioskMode();
			} else if (e.which == 109) { //'m'
				if ($("body").hasClass("hidemouse")) {
					$("body").removeClass("hidemouse");
				} else {
					$("body").addClass("hidemouse");
				}
			} else if (e.which == 100) { //'d'
				//environment.nodeWebKit = (typeof(process) === 'object' && process.features.uv) ? true : false;s
				//if (environment.nodeWebKit === true) 
				require('nw.gui').Window.get().showDevTools();
			}
			//alert(e.which);
		});

		//launchAttract();
		activateThisWeekButtons();
	});	
}

function flipicon() {
	flipflop=!flipflop;
	if (flipflop && flippediconIDs.length>5) {
		var flipbackID = flippediconIDs.shift();
		$('#'+flipbackID.toString()).removeClass('flip')
		flippoolIDs.push(flipbackID);
	} else {
		currentID = flippoolIDs.splice(Math.floor(Math.random()*(flippoolIDs.length-5)),1);
		var myID = "#"+currentID.toString();
		$(myID).removeClass();
		$(myID).addClass('ico').addClass(flipaxis[Math.floor(Math.random()*2)]);
		$(myID).addClass('flip');	
		flippediconIDs.push(currentID.toString());
	}
}

function popupulate() {
	
	$('#popTopic').addClass('popped '+chipicons[currentIndex]);
	$('h4').html(jsonObj[0].activitySet[currentIndex].econoQuestion);
	$('#choiceButtons button').removeClass('selected');
	$('#choiceButtons button:eq(0)').addClass('selected');
	$('#choices').css("left", '38px' );

	setTimeout(function(){ activateSliderButtons(); },1000);

	$('.infoBody:eq(0)').html(jsonObj[0].activitySet[currentIndex].option1);
	$('.infoBody:eq(1)').html(jsonObj[0].activitySet[currentIndex].option2);
	$('.infoBody:eq(2)').html(jsonObj[0].activitySet[currentIndex].option3);
	$('.infoBody:eq(3)').html(jsonObj[0].activitySet[currentIndex].option4);

	var c0,c1,c2,c3; 
	c0 = jsonObj[0].activitySet[currentIndex].option1b;
	c1 = jsonObj[0].activitySet[currentIndex].option2b;
	c2 = jsonObj[0].activitySet[currentIndex].option3b;
	c3 = jsonObj[0].activitySet[currentIndex].option4b;

	if (c0.length) $('.infoCredit:eq(0)').html(c0);
	if (c1.length) $('.infoCredit:eq(1)').html(c1);
	if (c2.length) $('.infoCredit:eq(2)').html(c2);
	if (c3.length) $('.infoCredit:eq(3)').html(c3);
	
}

function toggleVisibility() {
	 clickB.play();
	 
	if (!visibiltyAccess) {
		$('.container').addClass('makeNegative');
		visibiltyAccess=true;
		activateInactivityTimer();
	} else {
		$('.container').removeClass('makeNegative');
		visibiltyAccess=false;
	}
}
function activateSliderButtons() {
	$('#button1').mousedown(function(){ clickA.play(); });
	$('#button2').mousedown(function(){ clickA.play(); });
	$('#button3').mousedown(function(){ clickA.play(); });
	$('#button4').mousedown(function(){ clickA.play(); });
	$('#closeButton').mousedown(function(){ clickA.play(); });
	$('#button1').mouseup(function(){ slideTo(0); });
	$('#button2').mouseup(function(){ slideTo(1); });
	$('#button3').mouseup(function(){ slideTo(2); });
	$('#button4').mouseup(function(){ slideTo(3); });
	$('#closeButton').mouseup(function(){ closeMe(); });
}

function deactivateSliderButtons() {
	$("#button1").unbind('mousedown');
	$("#button2").unbind('mousedown');
	$("#button3").unbind('mousedown');
	$("#button4").unbind('mousedown');
	$("#closeButton").unbind('mousedown');
	$("#button1").unbind('mouseup');
	$("#button2").unbind('mouseup');
	$("#button3").unbind('mouseup');
	$("#button4").unbind('mouseup');
	$("#closeButton").unbind('mouseup');
}
function slideTo(index) {
	clickB.play();
	$('#choiceButtons button').removeClass('selected');
	$('#choiceButtons button:eq('+index+')').addClass('selected');
	$('#choices').css("left", (index*-850)+38+'px' );
}
function closeMe() {
	clickB.play();
	deactivateSliderButtons();
	//deactivateInactivityTimer();
	$('#popTopic').removeClass();
	setTimeout(function(){ flipback(); },500);
}
function flipback() {		
	  var flipbackIndex = jQuery.inArray(currentID, flippediconIDs); //flippediconIDs.indexOf(currentID);
		var flipbackID = flippediconIDs.splice(flipbackIndex,1);
		$('#'+flipbackID.toString()).removeClass('flip')
		flippoolIDs.push(flipbackID);	
		
		flipInterval = setInterval(function(){ flipicon(); },fliprate);
		activateThisWeekButtons();
}

function activateThisWeekButtons() {
	iconButtons=$(".ico").toArray();
	$(".ico").mousedown(function(){ clickA.play(); });
	$(".ico").mouseup(function(){ 
		clearInterval(flipInterval);
		deactivateThisWeekButtons();
		currentID= $(this).attr('id').toString(); 
		currentIndex = chipicons.indexOf(currentID);
		clickB.play();
		flippoolIDs.splice(jQuery.inArray( currentID, flippoolIDs),1);
		activateInactivityTimer();
		var myID = "#"+currentID.toString();
		if ($(myID).hasClass('flip')) {
			popupulate();
		} else {
			$(myID).removeClass();
			$(myID).addClass('ico').addClass(flipaxis[Math.floor(Math.random()*2)]);
			$(myID).addClass('flip');	
			
			$('#topbox').css("left", ( (currentIndex%5)*159)+'px' );
			$('#topbox').css("top", (Math.floor(currentIndex/5)*159)+'px' );
			flippediconIDs.push(currentID.toString());
			setTimeout(function(){ popupulate(); }, 1000); 
		}
	});
}

function deactivateThisWeekButtons() {
	$(".ico").unbind('mousedown mouseup');
}

function activateInactivityTimer() {
	$("body").on('mousemove click', function(e){ resetInactivityTimer() });
	resetInactivityTimer();
}
function deactivateInactivityTimer() {
	$("body").unbind('mousemove click');
	clearInterval(inactivityTimer);
}

function resetInactivityTimer() {
	clearInterval(inactivityTimer);
	inactivityTimer = setInterval(function(){ 
		deactivateInactivityTimer();
		if ($('#popTopic').hasClass('popped')) closeMe();
		if (visibiltyAccess) {
			visibiltyAccess = false;
			$('.container').removeClass('makeNegative');
		}
	},inactivityTolerance*1000);
}

function playClickA(){ clickA.play(); }
function playClickB(){ clickB.play(); }

