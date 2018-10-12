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
		var trainName = $("#trainName").val().trim();
		var destination = $("#destination").val().trim();
		var frequency = $("#frequency").val().trim();
		var alert = $("#alerts").val().trim();
		console.log(trainName, destination, frequency, alert);
	});

	// push train info into firebase
	database.ref("/trainSchedule").push({
		name: trainName,
		destination: destination,
		frequency: frequency,
		alert: alerts
	});


});	
