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
var freq = 0;

//At the initial load and subsequent value changes, get a snapshot of the stored data
database.ref('train/').on('value', function (snapshot) {
    console.log(snapshot.val());
});

//On submit button click...
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

    //Create local 'temporary' object for holding train information
    var newTrain = {
        name: trainName,
        dest: destination,
        firstTrainTime: firstTrain,
        frequency: freq
    };

    //Push data to Firebase
    database.ref('train/').push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    //Clear out form data
    $('form')[0].reset();
});

//Add trains to Firebase and create a new row on the HTML and store train data in row
database.ref('train/').on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());

    //Store everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().frequency;

    //Console log values
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(freq);


    //Calculations
    //Convert first train time to last year to be less than current time
    var firstTrainLY = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainLY);

    //Calculate time between current time and first train time last year
    var timeDifference = moment().diff(moment(firstTrainLY), "minutes");
    console.log(timeDifference)

    //Calculate time apart (remainder)
    var tRemainder = timeDifference % freq;

    //Calculate how many minutes away the train is
    var minsAway = freq - tRemainder;

    //Calculate next arrival time
    var next = moment().add(minsAway, "minutes");
    next = moment(next).format("HH:mm");

    //Append data to the table in a new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(freq),
        $("<td>").text(next),
        $("<td>").text(minsAway)
    );

    // Append the new row to the table
    $("#trains > tbody").append(newRow);

    //If any errors are experienced, log them to the console
    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



