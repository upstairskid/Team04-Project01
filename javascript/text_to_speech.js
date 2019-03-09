//Click to play/ pause / resume play text in "#test"
$("#play").on("click", function(){
    // need to change this to appropriate field on html
    var text = $("#test").text(); 
    
    // Set up play/ pause / resume function
    var isPlaying = responsiveVoice.isPlaying()
    var status = $("#play").attr("data-status")
    console.log(isPlaying, status)
    
    if(!isPlaying) {
        responsiveVoice.cancel();
        responsiveVoice.speak(text);
        $("#play").attr("data-status", "started").removeClass("fa-play-circle").addClass("fa-pause-circle");
    } else if (isPlaying && status == "started"){
        responsiveVoice.pause();
        $("#play").attr("data-status", "paused").removeClass("fa-pause-circle").addClass("fa-play-circle");
    } else if (isPlaying && status == "paused"){
        responsiveVoice.resume();
        $("#play").attr("data-status", "started").removeClass("fa-play-circle").addClass("fa-pause-circle");

    }
});

// Stop button
$("#stop").on("click", function(){
    $("#play").attr("data-status", "").removeClass("fa-pause-circle").addClass("fa-play-circle");
    responsiveVoice.cancel();
});

