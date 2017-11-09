/***************************** WINDOW.ONLOAD FUNCTIONS *****************************/
window.onload = function() {
	document.getElementById("stopwatchStartPause").onclick = function(evt) { // onClick function for stopwatch start/pause button
		if (showDebug) {
			var outputText = "stopwatchStartPause button was clicked.";
			addEventOutputTracking("onClick", outputText, "");
		}
		stopwatch(); // Go to function for start/pause stopwatch
		hideTimer(); // Stop the countdown timer from being able to run
	} // Stopwatch Start/Pause onclick event
	
	document.getElementById("stopwatchReset").onclick = function(evt) { // onClick function for stopwatch restart/reset button
		if (showDebug) {
			var outputText = "stopwatchReset button was clicked.";
			addEventOutputTracking("onClick", outputText, "");
		}
		resetStopwatch() // Go to function for start/stop stopwatch
	} // Stopwatch Reset/Restart onclick event	

	document.getElementById("startPauseTimer").onclick = function(evt) { // onClick function for countdown timer start/pause button
		if (showDebug) {
			var outputText = "startPauseTimer button was clicked.";
			addEventOutputTracking("onClick", outputText, "");
		}
		validateInput(); // Go to function for validating timer input
	} // Countdown Timer Start/Pause onclick event	

	if (showDebug) document.getElementById("debugOnOff").innerHMTL = "Debug is On";
		else document.getElementById("debugOnOff").innerHTML = "Debug is off";
	
	document.getElementById("debugOnOff").onclick = function(evt) { // onClick function for the debug on/off button
		if (showDebug) { // Show debugging is ON, so turn it off
			showDebug = false;
			document.getElementById("debugOnOff").innerHTML = "Debug is Off";
			addEventOutputTracking("onclick", "debugOnOff", " - Debugging turned OFF");
		} else { // Show debugging is OFF, so turn it on
			showDebug = true;
			document.getElementById("debugOnOff").innerHTML = "Debug is On";
			addEventOutputTracking("onclick", "debugOnOff", " - Debugging turned ON");
		}
	} //showDebug onclick event
	
	document.getElementById("hideDebug").onclick = function(evt) { // onClick function for hiding the debugging area
		// set showDebug to false
		showDebug = false;
		// hide output div
		document.getElementById("debugOutput").style.visibility = "hidden";
		// hide debug button
		document.getElementById("hideDebug").style.visibility = "hidden";
		// hide debug on/off button
		document.getElementById("debugOnOff").style.visibility = "hidden";
		// hide debugTools area
		document.getElementById("debugTools").style.visibility = "hidden";
	} //hide Debug onclick event
} // end window.onload

/***************************** GLOBAL VARIABLES *****************************/
var showDebug = true; // Debug On/Off global variable

var sMinutes = 0; // global variable to store stopwatch minutes
var sSeconds = 0; // global variable to store stopwatch seconds
var sHundredths = 0; // global variable to store stopwatch hundredths
var stopwatchOn = false; // Variable indicates whether or not the stopwatch is running
var stopwatchRun; // Global variable later used to control interval timer for stopwatch

var cMinutes = 0; // global variable to store countdown timer minutes
var cSeconds = 0; // global variable to store countdown timer seconds
var cHundredths = 0; // global variable to store countdown timer hundredths
var timerState = "new"; // Tracks the state of the timer
var timerInput; // Timer length
var countdownTimerRun; // Global variable later used to control interval timer for countdown timer
var sLoopCount = 1; // Counts second iterations of the timer loop for later output formatting purposes
var mLoopCount = 1; // Counts minute iterations of the timer loop for later output formatting purposes

function hideTimer() {
		document.getElementById("timerArea").style.visibility = "hidden"; // Hide the timer
}

function hideStopwatch() {
		document.getElementById("stopwatchArea").style.visibility = "hidden"; // Hide the stopwatch
}

/***************************** STOPWATCH FUNCTIONS *****************************/	   
function stopwatch() { // Function for when stopwatch start/pause button is clicked
	 if (showDebug) {
		var outputText = "stopwatch() function started.";
		addEventOutputTracking("Function called", outputText, "");
	}
	if (stopwatchOn == false) { // If stopwatch is stopped, start it
		stopwatchOn = true; 
		document.getElementById("stopwatchStartPause").innerHTML = "Running";
		document.getElementById("stopwatchReset").innerHTML = "Restart";
		stopwatchRun = setInterval(stopwatchIncrement, 10); // Interval timer to increment stopwatch every 10ms
		if (showDebug) {
			var outputText = "Stopwatch started: stopwatchIncrement() function called.";
			addEventOutputTracking("Function called", outputText, "");
			return;
		}
	}
	else { // If stopwatch is running, pause it
		clearInterval(stopwatchRun);
		stopwatchOn = false;
		document.getElementById("stopwatchStartPause").innerHTML = "Paused";
		document.getElementById("stopwatchReset").innerHTML = "Reset";
		if (showDebug) {
			var outputText = "Stopwatch paused.";
			addEventOutputTracking("Action", outputText, "");
			return;
		}
	}
}

function stopwatchIncrement() { // Increment stopwatch every 10ms
		sHundredths++;
	if (sHundredths == 100) { // Reset hundredths to 0 after reaching 100 and increment seconds by 1
		sHundredths = 0;
		sSeconds++;
	}
	if (sSeconds == 60) { // Reset seconds to 0 after reaching 60 and increment minutes by 1
		sSeconds = 0;
		sMinutes++;
	}
	
	if (sMinutes == 99 && sSeconds == 99 & sHundredths == 99) { // Stops stopwatch from running once it reaches 99:99:99
		clearInterval(stopwatchRun);
		document.getElementById("stopwatchNotification").innerHTML = "Stopwatch has maxed out! Please reset/restart.";
	}
	
	var m = sMinutes; // Minutes output variable
	var s = sSeconds; // Minutes output variable
	var h = sHundredths; // Minutes output variable
	if (sMinutes < 10) m = "0" + sMinutes; // Format the minutes output
	if (sSeconds < 10) s = "0" + sSeconds; // Format the seconds output
	if (sHundredths < 10) h = "0" + sHundredths; // Format the hundredths output
	document.getElementById("stopwatchDisplay").innerHTML = m + ":" + s + ":" + h; // innerHTML to output the stopwatch numbers
}

function resetStopwatch() { // Reset or restart the stopwatch
	if (showDebug) {
		var outputText = "resetStopwatch() function started.";
		addEventOutputTracking("Function called", outputText, "");
	}
	document.getElementById("stopwatchNotification").innerHTML = "";
	document.getElementById("stopwatchNotification").className = "";
	sMinutes = 0;
	sSeconds = 0;
	sHundredths = 0;
	if (stopwatchOn == true) {
		clearInterval(stopwatchRun);
		stopwatchRun = setInterval(stopwatchIncrement, 10); 
	}
	document.getElementById("stopwatchDisplay").innerHTML = "00:00:00";
}

/***************************** COUNTDOWN TIMER FUNCTIONS *****************************/
function validateInput() { // Validates timer input
	if (showDebug) {
		var outputText = "Function validateInput() was called.";
		addEventOutputTracking("Function called", outputText, "");
	}
	
	if (timerState == "new" && timerState != "done") { // Validate input if there is a new timer input
		timerInput = document.getElementById("timerInput").value;
		var regex = /^\d{2}:\d{2}:\d{2}$/;
		cMinutes = timerInput.substring(0,2); // Set countdown timer minutes based on input
		cSeconds = timerInput.substring(3,5); // Set countdown timer seconds based on input
		cHundredths = timerInput.substring(6); // Set countdown timer hundredths based on input
	   
		if (regex.test(timerInput) && ((cMinutes <= 9 && cSeconds <= 59)|| (cMinutes == 10 && cSeconds == 0 && cHundredths ==0))){ // true - validates
			document.getElementById("validationImage").innerHTML = "&nbsp;&nbsp;<img src=\"greencheck.png\">";
	    	document.getElementById("timerPrompt").className = "blacktext";
	    	if (showDebug) {
				var outputText = "Countdown timer input " + timerInput + " was validated.";
				addEventOutputTracking("Input validated", outputText, "");
			}
			document.getElementById("countdownTimerDisplay").innerHTML = timerInput;
			if (showDebug) {
				var outputText = "Countdown timer set to " + timerInput + " .";
				addEventOutputTracking("Countdown timer display updated", outputText, "");
			}
			document.getElementById("timerPrompt").innerHTML = "Your timer of length " + timerInput + " is running!<br> Please refresh page if you would like to start a new one.";
	    	countdownTimer(); // Go to countdown timer function
	    	hideStopwatch(); // Stop the stopwatch from being able to run
	    }
	    else {
	    	document.getElementById("validationImage").innerHTML = "&nbsp;&nbsp;<img src=\"redx.png\">";
	    	document.getElementById("timerPrompt").className = "redtext";
	    	if (showDebug) {
				var outputText = "Countdown timer input " + timerInput + " failed to validate.";
				addEventOutputTracking("Input invalid", outputText, "");
			}
		}
	}
	else countdownTimer(); // Moves straight to countdownTimer function if the button hit is not for a new timer and doesn't need input validation
} // end function validateInput()

function countdownTimer() { //countdownTimer function
	if (showDebug) {
		var outputText = "countdownTimer() function started";
		addEventOutputTracking("Function called", outputText, "");
	}
	if (timerState == "done") { // Covers the instance where the user clicks the start/stop button after timer has expired
		if (showDebug) {
			var outputText = "Timer button clicked - Timer is up.";
			addEventOutputTracking("Timer button clicked", outputText, "");
		}
		document.getElementById("timerPrompt").innerHTML = "Please refresh page to start a new timer.";
		document.getElementById("timerPrompt").className = "redtext";
		document.getElementById("validationImage").innerHTML = "";
		return;
	}
	if ((timerState == "new" || timerState == "off")) { // If timer is stopped start it unless it's done
		timerState = "on"; 
		countdownTimerRun = setInterval(timerDecrement, 10); // Interval timer to increment stopwatch every 10ms
		if (showDebug) {
			var outputText = "Timer started: timerDecrement() function called.";
			addEventOutputTracking("Function called", outputText, "");
			return;
		}
	}
	else { // If timer is running, pause it
		clearInterval(countdownTimerRun);
		timerState = "off";
		if (showDebug) {
			var outputText = "Timer paused. Timer state is " + timerState + ".";
			addEventOutputTracking("Action", outputText, "");
			return;
		}
	}
}

function timerDecrement() { // Decrements the time for the countdown timer
	cHundredths--;
	if (cHundredths == -1) { // Reset hundredths to 99 after reaching 0 and decrement seconds by 1
		cHundredths = 99;
		sLoopCount++; // Used for number formatting later
		cSeconds--;
	}
	if (cSeconds == -1) { // Reset seconds to 59 after reaching 0 and decrement minutes by 1
		cSeconds = 59;
		mLoopCount++; // Used for number formatting later
		cMinutes--;
	}
	
	if (cMinutes == 0 && cSeconds == 0 && cHundredths ==0) { // Notification once timer has finished running
	clearInterval(countdownTimerRun);
	timerState = "done";
	document.getElementById("countdownTimerDisplay").className = "timerUp";
	document.getElementById("countdownTimerDisplay").innerHTML = "Time UP!"; // innerHTML to alert user of timer completion
	document.getElementById("timerPrompt").innerHTML = "Your timer of length " + timerInput + " is DONE!<br> Please refresh page if you would like to start a new one.";
	document.getElementById("validationImage").innerHTML = "";
	if (showDebug) {
		var outputText = "Timer is up!";
		addEventOutputTracking("Timer finished", outputText, "");
	}	
	return;
}
	
	var M = cMinutes; // Output text for the countdown timer minutes
	var S = cSeconds; // Output text for the countdown timer seconds
	var H = cHundredths; // Output text for the countdown timer hundredths
	if (cMinutes < 10 && mLoopCount != 1) M = "0" + cMinutes; // Format the minutes output
	if (cSeconds < 10 && sLoopCount != 1) S = "0" + cSeconds; // Format the seconds output
	if (cHundredths < 10) H = "0" + cHundredths; // Format the hundredths output
	document.getElementById("countdownTimerDisplay").innerHTML = M + ":" + S + ":" + H; // innerHTML to output the timer numbers
}
	
/***************************** DEBUGGING OUTPUT *****************************/	
function addEventOutputTracking(eventName, outputText, extraText) {
	var node = document.getElementById("debugOutput"); // existing div we are adding to
	var pChildNode = document.createElement("p"); // new element that will be child of node
	node.appendChild(pChildNode); // adding p element as child of div
	pChildNode.appendChild(document.createTextNode("Event: " + eventName + " - " + outputText + " " + extraText)); // adding text to new p element
} // end function addEventOutputTracking
