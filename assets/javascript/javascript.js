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
var trainName = "Orange Blossom Special";
var trainDestination = "Miami, FL";
var firstTrainTime = 14;
var trainFrequency = 54;

database.ref().push({
    dbtrainName: trainName,
    dbtrainDestination: trainDestination,
    dbfirstTrainTime: firstTrainTime,
    dbtrainFrequency: trainFrequency
});




