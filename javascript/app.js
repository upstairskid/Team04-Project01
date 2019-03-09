// Initialize Firebase

var config = {
    apiKey: "AIzaSyCmSL8YwL-UB8DvE-VErXPvVjLg0TNAGrY",
    authDomain: "project01-team04.firebaseapp.com",
    databaseURL: "https://project01-team04.firebaseio.com",
    projectId: "project01-team04",
    storageBucket: "project01-team04.appspot.com",
    messagingSenderId: "845517864456"
  };

  firebase.initializeApp(config);

  // Variable to reference Firebase
  var database = firebase.database();

  // User connections can be stored in a directory whent hey are logged in. 
  // This could represent storing authentication data (??)
  var connectionsRef = database.ref("/connections");

  // Now, the state of this authentication can be updated
  // depending on whether the user is logged in or not
  // treat as a boolean value!

  var connectedRef = database.ref(".info/connected");

//__________________________________________________________________________
// this next part requires a function for if the  user is connected or not
// and how to treat the authentication. 
// This is Nick's part so far. But will tackle still if I get the chance.

//When first connected
//__________________________________________________________________________

// Moving on to storing the data that our users will be retrieving.
// Variables need to be created first to refernce these "objects of data"

var initialImage = [];
var textReturned = "";
var audio = [];

// Capture image upload (the "add image" option must have a submit button in the html for this to 
// to work. In this case the submit button will need to have an ID of #add-image.)
$("#add-image").on("click", function(event) {
event.preventDefault(); // should we listen to something

initialImage = $("#image-input").val().trim();
textReturned = $("#text-input").val().trim();
audio = $("#audio-input").val().trim(); 
// Do we need the above #audio-input(??) We may not if the audio is going to play automatically

//Now here is the code for setting the information to the database

database.ref().set({
    // keep in mind we do not need all three; most likely the only 
    // relevant one is the textReturned object.
    initialImage: initialImage,
    textReturned: textReturned,
    audio: audio,
    });
// there is a snapshot example, but in this case we do not need a snapshot 
// because the purpose of this project is really to store the user
// input data which we have done above. We do not need to dispaly it in real-time
});

// The above sets the data once retrieved via the APIs but now we need to save it to a specififc directory

database.ref().on("child_added", function() {
    // Use POST to save the data
});

// Use a separate function for the GET request to retrieve when necessary

