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

    //Calculate next arrival


    //Calculate minutes away
    //var minsAway = moment().diff(moment(firstTrain, 'm'), 'm');
    //console.log(minsAway)



    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(freq)
        //$("<td>").text(next),
        //$("<td>").text(minsAway)
      );

        // Append the new row to the table
  $("#trains > tbody").append(newRow);
})

