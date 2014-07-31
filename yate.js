// JavaScript Document
var chipicons=['bicycle','shopping','school','transportation','dog','daycare','vacation','restaurant','paint','soccer','movie','golf','game','garden','doctor'],flippoolIDs = new Array(),flippediconIDs = new Array(), iconButtons=new Array(), flipaxis = ['Xaxis', 'Yaxis'], jsonObj = {};

var chosen="", flipflop=false, visibiltyAccess=false, inactivityTimer, timerCallback, inactivityCount=0, countDown=0, inactivityAlertVisible = false, inactivityTolerance= 30, fliprate=1200, attractIsPlaying= false, currentID, flipInterval,jsonObj,jsObj; 

//$( document ).ready(initializeMe());
function initializeMe() {
	$( document ).ready(function() {
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
		setTimeout( function(){
			//$("body").mousemove( function(){resetInactivityTimer()} ); 
			//$("body").click( function(){resetInactivityTimer()} );
			$("body").on('mousemove click', function(e){ resetInactivityTimer() }); 
		}, 500 );
		$('#visualaccess').on('mousedown', function(e){ clickA.play()} );
		$('#visualaccess').on('mouseup', function(e){ toggleVisibility()} );
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
	$('#popTopic').removeClass();
	setTimeout(function(){ flipback(); },500);
	//$('#data2').text(currentID);
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
	$(".ico").unbind('mousedown');
	$(".ico").unbind('mouseup');
}/*
function iconClicked() {
	clickB.play();
	flippoolIDs.splice(jQuery.inArray( currentID, flippoolIDs),1);
	var myID = "#"+currentID.toString();
	$(myID).removeClass();
	$(myID).addClass('ico').addClass(flipaxis[Math.floor(Math.random()*2)]);
	$(myID).addClass('flip');	
	flippediconIDs.push(currentID);
	setTimeout(function(){ popupulate(); }, 1000); 
}





function activateRestartButton() { 
	$("#restartButton").click(function(){
		$(chosenAge).removeClass('screen3');
		$("#chooseWhich").removeClass('drop moveIn');		
		setTimeout(function(){
			cleanupClasses();
			deactivateRestartButton();
			restartIntro();
		},3000);
		dropThese(thingsToDisplay);		
	});
}

function deactivateRestartButton() { $('#restartButton').unbind('click').removeClass('moveIn drop');  }

function fillSection( sectionId ) {
	var iD = sectionId;
	$('#sectionSet').removeClass();
	$('#sectionSet').addClass(jsonObj[0].ageGroup[iD].sectionSet); 
	$('#imagineA').html(jsonObj[0].ageGroup[iD].imagineA);
	$('#imagineB').html(jsonObj[0].ageGroup[iD].imagineB);
	$('#choiceOptA').html(jsonObj[0].ageGroup[iD].choiceOptA);
	$('#choiceOptB').html(jsonObj[0].ageGroup[iD].choiceOptB);
	$('#opCostHeadA').html(jsonObj[0].ageGroup[iD].opCostHeadA);
	$('#opCostSubheadA').html(jsonObj[0].ageGroup[iD].opCostSubheadA);
	$('#opCostTextA').html(jsonObj[0].ageGroup[iD].opCostTextA);
	$('#opCostHeadB').html(jsonObj[0].ageGroup[iD].opCostHeadB);
	$('#opCostSubheadB').html(jsonObj[0].ageGroup[iD].opCostSubheadB);
	$('#opCostTextB').html(jsonObj[0].ageGroup[iD].opCostTextB);
	$('#chooseCorD').html(jsonObj[0].ageGroup[iD].chooseCorD);
	$('#choiceOptC').html(jsonObj[0].ageGroup[iD].choiceOptC);
	$('#choiceOptD').html(jsonObj[0].ageGroup[iD].choiceOptD);
	$('#opCostHeadC').html(jsonObj[0].ageGroup[iD].opCostHeadC);
	$('#opCostSubheadC').html(jsonObj[0].ageGroup[iD].opCostSubheadC);
	$('#opCostTextC').html(jsonObj[0].ageGroup[iD].opCostTextC);
	$('#opCostHeadD').html(jsonObj[0].ageGroup[iD].opCostHeadD);
	$('#opCostSubheadD').html(jsonObj[0].ageGroup[iD].opCostSubheadD);
	$('#opCostTextD').html(jsonObj[0].ageGroup[iD].opCostTextD);
	$('#caseA').html(jsonObj[0].ageGroup[iD].caseA);
	$('#finalA').html(jsonObj[0].ageGroup[iD].finalA);
	$('#caseB').html(jsonObj[0].ageGroup[iD].caseB);
	$('#finalB').html(jsonObj[0].ageGroup[iD].finalB);
}
function activateInactivityTimer() {
	inactivityCount = 0;
	inactivityTimer = setInterval(function(){inactivityAlert()},inactivityTolerance*1000);
	//$("body").mousemove( function(){resetInactivityTimer()} );
}
*/
function secondsCounter() {
	inactivityCount++;
	$("#inactivityAlertBox center").html(inactivityCount);
	if(inactivityTolerance<inactivityCount) inactivityAlert();
}

function inactivityAlert() { 
	$("#inactivityAlertBox").addClass('showMe');
	inactivityAlertVisible = true;
	clearInterval(inactivityTimer);
	setTimeout(function(){ inactivityTimer = setInterval(function(){secondsCountdown()}, 1000); }, 500);
	countDown = 10;
	$("#inactivityAlertBox center").html(countDown);
}

function secondsCountdown() {
if ( countDown-- ) {
			$("#inactivityAlertBox center").html(countDown);
		} else {
			clearInterval(inactivityTimer);
			//	window.location.reload();
			//	 or  these three lines 
			$("#inactivityAlertBox").removeClass('showMe'); //
			inactivityAlertVisible = false; //
			launchAttract(); //
		}
}	

function resetInactivityTimer() {
	clearInterval(inactivityTimer);
	inactivityTimer = setInterval(function(){inactivityAlert()},inactivityTolerance*1000);
	if (attractIsPlaying) { //  
		attractIsPlaying = false;
		prepareForLaunch();
	} else if ( inactivityAlertVisible ) {
		$("#inactivityAlertBox").removeClass('showMe'); 
		inactivityAlertVisible = false;
	} else {
		timerCallback = secondsCounter;
		inactivityCount=0;
		$("#inactivityAlertBox center").html(inactivityCount);
	}
}

function playClickA(){
	//$('#data1').text('A A A A A A A A A A A A A A');
//	clickA.currentTime=0;
	clickA.play();
}
function playClickB(){
	//$('#data1').text(' B B B B B B B B B B B ');
	//clickB.currentTime=0;
	clickB.play();

/*	clickB.pause();
	clickB.load();
	clickB.play();*/
}

/*
function launchAttract() {
	cleanupClasses();
	attractIsPlaying=true;
	clearInterval(inactivityTimer);
	pauseAmbience();
	if (visibiltyAccess) {
		visibiltyAccess = false;
		$('#outerContainer').removeClass('makeNegative');
	}
	
	
	ageCount=0;
	$('#attract').removeClass().css({'display':'block' });
	$('#attract').addClass('fadein');
	$('#attractBalance').removeClass();
	
	setTimeout(function(){
		$('#attractBalance').addClass('fadein');
	}, 1000);
	
		$("#iconL1").removeClass().addClass('afar');
		$("#iconL2").removeClass().addClass('afar'); 
		$("#iconR1").removeClass().addClass('afar'); 
		$("#iconR2").removeClass().addClass('afar'); 

	setTimeout(function(){
		$("#iconL1").addClass('senior');
		$("#iconR1").addClass('senior');
		$("#iconL2").addClass('approachToSwap').addClass('senior'); 
		$("#iconR2").addClass('approachToSwap').addClass('senior'); 
	}, 2000);


	setTimeout(function(){ 
		playAttractAnim(); 
		attractLooper = setInterval(function(){playAttractAnim()},17000);
	}, 3000);
}
function playAttractAnim() {
	advanceSection();
//$('#balanceStruct').removeClass().addClass(agegroupArray[ageCount]);
	setTimeout(function(){ $("#titleA").addClass('approach'); },000);
	setTimeout(function(){ $("#titleB").addClass('approach'); },800);
	setTimeout(function(){ $("#titleC").addClass('approach'); },1600);
	setTimeout(function(){ $("#titleD").addClass('approach'); },2400);	
	setTimeout(function(){ $("#titleQM").addClass('approach'); },3100);
	
	setTimeout(function(){ $("#titleA").removeClass('approach'); },4000);
	setTimeout(function(){ $("#titleB").removeClass('approach'); },5000);
	setTimeout(function(){ $("#titleC").removeClass('approach'); },6000);
	setTimeout(function(){ $("#titleD").removeClass('approach'); },7000);
	setTimeout(function(){ $("#titleQM").removeClass('approach'); },8000);
	
	setTimeout(function(){ $("#iconR1").addClass('approachToSwap'); },5300);
	setTimeout(function(){ $("#iconR2").addClass('pushedSwap'); },6500);
	setTimeout(function(){ $("#iconR2").addClass('hide'); $("#balanceStruct").addClass('tilt'); },7100);
	setTimeout(function(){ $("#iconR2").removeClass().addClass(agegroupArray[ageCount]).addClass('afar'); },7200);
	setTimeout(function(){ $("#iconL1").addClass('approachToSwap'); },8300);
	setTimeout(function(){ $("#iconL2").addClass('pushedSwap'); },9500);
	setTimeout(function(){ $("#iconL2").addClass('hide'); $("#balanceStruct").removeClass('tilt'); },10100);	
	setTimeout(function(){ $("#iconL2").removeClass().addClass(agegroupArray[ageCount]).addClass('afar'); },10200);	
	setTimeout(function(){ $("#iconR2").addClass('approachToSwap'); },11300);
	setTimeout(function(){ $("#iconR1").addClass('pushedSwap'); },12500);
	setTimeout(function(){ $("#iconR1").addClass('hide'); $("#balanceStruct").addClass('tilt');  },13100);
	setTimeout(function(){ $("#iconR1").removeClass().addClass(agegroupArray[ageCount]).addClass('afar'); },13200);
	setTimeout(function(){ $("#iconL2").addClass('approachToSwap'); },14300);
	setTimeout(function(){ $("#iconL1").addClass('pushedSwap'); },15500);
	setTimeout(function(){ $("#iconL1").addClass('hide'); $("#balanceStruct").removeClass('tilt'); },16100);
	setTimeout(function(){ $("#iconL1").removeClass().addClass(agegroupArray[ageCount]).addClass('afar'); },16200);


}
function advanceSection() {
	ageCount++;
	ageCount%=4;
}

function prepareForLaunch() {
	clearInterval(attractLooper);
	$('#attract').addClass('fadeout');
	setTimeout(function(){ restartIntro(); },1000);
}

function restartIntro() {
	$('#attract').css({'display':'none' });
		$("#qmark").addClass('spin');
		setTimeout(function(){ pauseAmbience(); },1000);
		//pauseAmbience();	,,
		moveinTiming = [0, 2.33, 1.33, 1.33, .33, 1.66, .99, .33, .25, .25, .25, .25];
		setTimeout(function(){
			moveinSlow(['#title', '#opChoiceA', '#opChoiceB','#moneyContainer','#opCost' , '#seeHowItWorks', '#chooseAgeGroup' ,'#teenager', '#youngadult', '#adult', '#senior']);
		},100);
		setTimeout(function(){ resumeAmbience(); },11000);
		setTimeout(function(){ activateAgeGroupButtons(); },11000);  //10500)  we need enough delay so that moveinSLow delaye3d call to remove styles is complete.
}

function cleanupClasses(){
	domElements = ['#qmark', '#balance', '#clock', '#moneyContainer', '#money', '#title', '#opChoiceA', '#opChoiceB', '#opCost', '#seeHowItWorks', '#chooseAgeGroup','#teenager', '#youngadult', '#adult', '#senior', '#opCost2', '#imagine', '#imagineA', '#imagineB','#chooseWhich','#choiceOptA', '#choiceOptB', '#opCostHeadA','#opCostFlipContainer','#opCostHeadB','#opCostSubheadA','#opCostSubheadB', '#opCostTextA', '#opCostTextB', '#nextButton','#timeToDecide', '#chooseCorD', '#chooseWhich','#choiceOptC','#choiceOptD','#opCostHeadC','#opCostSubheadC', '#opCostTextC','#opCostHeadD','#opCostSubheadD', '#opCostTextD','#opCostHelp', '#opCostUnderstandA', '#opCostUnderstandB', '#opWhenever', '#finalConsiderations', '#restartButton'];
	var l= domElements.length;
	for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ).removeClass();
	$("#qmark").addClass('hideb4anim');
	
}
function dropThese(domElements) {	
	var l= domElements.length;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all .7s ease-in '+Math.random()*.3+'s'}).addClass('drop');
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },2000);
}
function moveinSlow(domElements) {	
	var l= domElements.length;
	var n=0, t=0;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all 1s ease-out '+(0.3+(t+=moveinTiming[i]))+'s'}).addClass('moveIn');
	//(t=9.05)
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },t*1000+1200);
}

function moveinThese(domElements) {	
	var l= domElements.length;
	var n=0;
	for (var i = 0; i < l; i++) $(domElements[i]).css({'webkit-transition':'all .7s ease-out '+(1.3+.15*n++)+'s'}).addClass('moveIn');
	setTimeout(function(){ for (var i = 0; i < l; i++) $(domElements[i]).removeAttr( 'style' ); },3000);
}
function pauseAmbience() {
	  $("#money").addClass('paused');
	  //$("#qmark").addClass('paused');
	  $("#innerContainer").addClass('paused');
}

function resumeAmbience() {
	  $('#money').removeClass('paused');
	  //$('#qmark').removeClass('paused');
	  $('#innerContainer').removeClass('paused');
}
*/