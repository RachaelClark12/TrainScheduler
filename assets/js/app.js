// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBVq4okF_i7quzLM_YyA1fjlyLcZo72R28",
    authDomain: "fsf-inclass-d1f19.firebaseapp.com",
    databaseURL: "https://fsf-inclass-d1f19.firebaseio.com",
    projectId: "fsf-inclass-d1f19",
    storageBucket: "fsf-inclass-d1f19.appspot.com",
    messagingSenderId: "59650777287",
    appId: "1:59650777287:web:5215294c9f40109e8c1ee2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Assign the reference to the database and path
var database = firebase.database();
var path = 'train/';

//Initial Values
var trainName;
var destination;
var firstTrain;
var freq;
var next;
var minsAway;

//At the initial load and subsequent value changes, get a snapshot of the stored data
database.ref('train/').on('value', function (snapshot) {
    console.log(snapshot.val());
});

$('.btn-submit').on('click', function (event) {
    //Prevent form from submitting
    event.preventDefault();

    //Get input values
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first-train-time').val().trim();
    var freq = $('#frequency').val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(freq);

    database.ref('train/').push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        freq: freq
    });
    $('form')[0].reset();
});




