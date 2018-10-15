$(document).ready(function () {
	// info to connenect to Firebase
	var config = {
		apiKey: "AIzaSyA3v-1-gv7sk1GoUtopinTSNRMA3NJaGU0",
		authDomain: "ibayontrainschedule.firebaseapp.com",
		databaseURL: "https://ibayontrainschedule.firebaseio.com",
		projectId: "ibayontrainschedule",
		storageBucket: "ibayontrainschedule.appspot.com",
		messagingSenderId: "1047475272962"
	};
	//initialize the database
	firebase.initializeApp(config);

	var database = firebase.database();
	// Submit button
	$("#submit").on("click", function (event) {
		console.log("SUBMITTING FORM");
		event.preventDefault();
		var inputTrainName = $("#trainName").val().trim();
		var inputDestination = $("#destination").val().trim();
		var inputFrequency = $("#frequency").val().trim();
		var inputFirstTrain = $("#firstTrain").val().trim();

		// push train inputs into firebase

		database.ref("/schedule").push({
			//field in firebase: value from user input
			firebaseTrainName: inputTrainName,
			firebaseDestination: inputDestination,
			firebaseFrequency: inputFrequency,
			firebaseFirstTrain: inputFirstTrain
		});

		//clear the fields to allow for the next entry
		//think about hiding the admin section until authorized user enters a pin?
		$("#trainName").val("");
		$("#destination").val("");
		$("#frequency").val("");
		$("#firstTrain").val("");
		// Prevents page from refreshing
		return false;
	});

	//display the admin entries
	// child_added event - firebase
	database.ref("/schedule").on("child_added", function (snapshot) {
		//console.log(snapshot.val());
		var trainName = snapshot.val().firebaseTrainName;
		//console.log("The train name is " + trainName);
		var trainDestination = snapshot.val().firebaseDestination;
		var startTime = snapshot.val().firebaseFirstTrain;
		var trainFrequency = snapshot.val().firebaseFrequency;

		// vars for time calculations
		var tFrequency = trainFrequency;
		var firstTime = startTime;
		var firstTimeConverted = moment(firstTime, "HH:mm");
		var currentTime = moment();
		// convert the diff in time to a number
		var diffTime = parseInt(moment().diff(moment(firstTimeConverted), "minutes"));

		// find what remains between 
		var tRemainder = parseInt(diffTime) % parseInt(tFrequency);
//the number of minutes until the next train comes
		tMinutesUntilTrain = parseInt(tFrequency) - parseInt(tRemainder);

		var nextTrain = moment().add(tMinutesUntilTrain, "minutes");
		nextTrain = (moment(nextTrain).format("hh:mm A"));


		$("#theSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
			trainFrequency + " min" + "</td><td>" + nextTrain + "</td><td>" + "Arrives in : " + tMinutesUntilTrain + " min" + "</td></tr>");
	});

});
