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

  //Variable for clickcounter
  var clickCounter = 0
//______________________________________________________________________________________
// If we move forward with authentication, this is the section of code to implement it
// From the sign-up page grab the user's email and password and store the UID
//Store the UID in a separate branch
//______________________________________________________________________________________

// This just creates a branch to store the user's session when logged in
var connectionsRef = database.ref("/connections");

// Create a variable that updates with each time the user's connection status changes

var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });

// Moving on to storing the data that our users will be retrieving.
// Variables need to be created first to reference these "objects of data"

var history = [];
var title = $("#title").text();
var description = $("#info").text();

// LOCAL STORAGE Grab the values and Store in local storage now
$("body").on('DOMSubtreeModified', "#info", function() {
    
    textObject = $("#info").val().trim();
    
    console.log(textObject);

    localStorage.clear();

    localStorage.setItem("Description", textObject);
});

$("#trainTable").text(localStorage.getItem("Description"));

//click-counter for firebase
$("body").on('DOMSubtreeModified', "#info", function() {
    clickCounter++;

    database.ref("/clickvalues").set({
    clickCount: clickCounter
    });
})

/* This code to store in firebase is not useful since we need the history to be associated
with the user; which we can only do with local storage

//Now we need to get it added to the search section history
    
// Firebase watcher + initial loader HINT: .on("value")
database.ref("/username").on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val().username);
   
    // Change the HTML to reflect
    $("#username-history-div").text(snapshot.val().username);
    
    },
    // Handle the errors
   function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });*/
    
// Now for the click-counter value to count the number of times the API is accessed