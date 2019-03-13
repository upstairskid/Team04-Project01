// Initialize Firebase
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
  var clickCounter = 0;

  //var clicks ="";
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

var username = "";
var title = "";
var description = "";
// The above (connectionsRef and connectedRef) just store the numbers but I need it to store the name.

// FIREBASE Capture text insertion event and store as variables
$("body").on('DOMSubtreeModified', "#trainTable", function() {
    
    username = $("#trainTable").val().trim();
    console.log(username);

//Set it in the firebase database
database.ref("/username").set({
    username: username,
})
});

// Now for the click-counter value to count the number of times the API is accessed
$("body").on('DOMSubtreeModified', "#label", function() {
    clickCounter = clickCounter + 0.5;

    database.ref("/clickvalues").set({
      clickCount: clickCounter
    });
});
    //Firebase watcher + initial loader HINT: .on("value")
    database.ref("/clickvalues").on("value", function(snapshot) {
       
        console.log(snapshot.val());
      //if (snapshot.child("clickCounter").exists()) {

        clickCounter = snapshot.val().clickCount;

          // Change the HTML to reflect
          $("#counter").text(snapshot.val().clickCount);
      });