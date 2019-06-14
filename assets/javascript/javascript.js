console.log("Javascript is linked and running.");

//Firebase set-up
var firebaseConfig = {
    apiKey: "AIzaSyDdr7mJFmg6oDS7MVtpfWVVn45D_xjUIxU",
    authDomain: "trainschedule-5f435.firebaseapp.com",
    databaseURL: "https://trainschedule-5f435.firebaseio.com",
    projectId: "trainschedule-5f435",
    storageBucket: "trainschedule-5f435.appspot.com",
    messagingSenderId: "4642178300",
    appId: "1:4642178300:web:83846d1453557a8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//Initialize Global Variables
var trainName = "";
var trainDestination = "";
var firstTrainTime = 0;
var trainFrequency = 0;

$("#submit").click(function () {
    event.preventDefault(event);
    var holdTrainName = $("#trainName").val().trim();
    var holdTrainDestination = $("#trainDestination").val().trim();
    var holdFirstTrainTime = $("#firstTrainTime").val().trim();
    var holdTrainFrequency = $("#trainFrequency").val().trim();

    //Convert incoming time (holdFirstTrainTime) to unix
    //var convertedTime = moment(holdFirstTrainTime, "HH:mm").format("X");
    //console.log(convertedTime);

    trainName = holdTrainName;
    trainDestination = holdTrainDestination;
    firstTrainTime = holdFirstTrainTime;
    trainFrequency = holdTrainFrequency;

    database.ref().push({
        dbtrainName: trainName,
        dbtrainDestination: trainDestination,
        dbfirstTrainTime: firstTrainTime,
        dbtrainFrequency: trainFrequency
    });


    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrainTime").val("");
    $("#trainFrequency").val("");

});


database.ref().on("child_added", function (dataFromDatabase) {
    console.log(dataFromDatabase.val());

    var ttrainName = dataFromDatabase.val().dbtrainName;
    var ttrainDestination = dataFromDatabase.val().dbtrainDestination;
    var tfirstTrainTime = dataFromDatabase.val().dbfirstTrainTime;
    var ttrainFrequency = dataFromDatabase.val().dbtrainFrequency;

    var nextTrainTime = "";
    var displayTime = "";
    var displayMinutesAway = "";

    //IF First Train Time has not yet occurred, display First Train Time as NEXT TRAIN
    //ELSE compute moments until next train.
    var now = moment();
    console.log(now);
    //Convert current time and first time to unix
    var convertedCurrentTime = moment(now, "HH:mm").format("X");
    var convertedFirstTime = moment(tfirstTrainTime, "HH:mm").format("X");

    console.log(convertedCurrentTime < convertedFirstTime);
    if (convertedCurrentTime < convertedFirstTime) {
        displayTime = moment(tfirstTrainTime, "HH:mm").format("hh:mm A");
        
        var minutesAway = (convertedFirstTime - convertedCurrentTime) / 60;
        displayMinutesAway = Math.floor(minutesAway);
    }

    else {
        //Difference between first time and current time
        //var convertedFirstTrainTime = moment(tfirstTrainTime, "X").format("HH:mm");
        var diffTime = (convertedCurrentTime - convertedFirstTime)/60;
        
        //Time apart
        var tRemainder = diffTime % ttrainFrequency;

        //Minutes until next train
        var tMinutesAway = ttrainFrequency - tRemainder;
        displayMinutesAway = Math.floor(tMinutesAway);
        //Next train time
        var nextTrainTime = moment().add(tMinutesAway, "minutes");
        displayTime = moment(nextTrainTime).format("hh:mm A");

    }


    var tr = $("<tr>");
    var tdtrainName = $("<td>").text(ttrainName);
    var tdtrainDestination = $("<td>").text(ttrainDestination);
    var tdtrainFrequency = $("<td>").text(ttrainFrequency);
    var tdnextArrival = $("<td>").text(displayTime);
    var tdminutesAway = $("<td>").text(displayMinutesAway);

    tr.append(tdtrainName, tdtrainDestination, tdtrainFrequency, tdnextArrival, tdminutesAway);

    $("tbody").append(tr);

})




