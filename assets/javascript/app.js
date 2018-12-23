var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";


var newTrain = $("#train-name");
var newTrainDestination = $("#train-destination");
var newTrainTime = $("#train-time").mask("00:00");
var newTimeFreq = $("#time-freq").mask("00");



var config = {
    apiKey: "AIzaSyBTUzVgu0mbf6Oao0-Kdi4aOa38bG7GQWo",
    authDomain: "train-schedule-85515.firebaseapp.com",
    databaseURL: "https://train-schedule-85515.firebaseio.com",
    projectId: "train-schedule-85515",
    storageBucket: "",
    messagingSenderId: "503324976963"
  };


firebase.initializeApp(config);


var database = firebase.database();

database.ref("/trains").on("child_added", function(snapshot) {

    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    
    trainRemainder = trainDiff % frequency;

    
    minutesTillArrival = frequency - trainRemainder;

    
    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    
    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + minutesTillArrival + "</td>" +
        "<td>" + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td></tr>"
    );

    $("span").hide();
});


var storeInputs = function(event) {
    
    event.preventDefault();

    
    trainName = newTrain.val().trim();
    trainDestination = newTrainDestination.val().trim();
    trainTime = moment(newTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
    trainFrequency = newTimeFreq.val().trim();

    
    database.ref("/trains").push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

    
    newTrain.val("");
    newTrainDestination.val("");
    newTrainTime.val("");
    newTimeFreq.val("");
};


$("#btn-add").on("click", function(event) {
    
    if (newTrain.val().length === 0 || newTrainDestination.val().length === 0 || newTrainTime.val().length === 0 || newTimeFreq === 0) {
        alert("Please Fill All Required Fields");
    } else {
        
        storeInputs(event);
    }
});


$('form').on("keypress", function(event) {
    if (event.which === 13) {
        
        if (newTrain.val().length === 0 || newTrainDestination.val().length === 0 || newTrainTime.val().length === 0 || newTimeFreq === 0) {
            alert("Please Fill All Required Fields");
        } else {
            
            storeInputs(event);
        }
    }
});