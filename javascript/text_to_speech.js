//Click to play/ pause / resume play text in "#test"
$("#play").on("click", function(){
    // need to change this to appropriate field on html
    var text = $("#test").text(); 
    
    // Set up play/ pause / resume function
    var isPlaying = responsiveVoice.isPlaying()
    console.log(isPlaying, status)
    
    if(!isPlaying) {
        responsiveVoice.speak(text);
    } else {
        responsiveVoice.resume();
    }
});

// Pause button
$("#pause").on("click", function(){
    responsiveVoice.pause();
});
// Stop button
$("#stop").on("click", function(){
    $("#play").attr("data-status", "").removeClass("fa-pause-circle").addClass("fa-play-circle");
    responsiveVoice.cancel();
});

