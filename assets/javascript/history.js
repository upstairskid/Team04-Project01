// rendering history
function displayHistory(){
    var display = JSON.parse(localStorage.getItem("history"));
    if (display !== null){
        for (var i = 0; i < display.length; i++ ){
            var title = display[i].title.split("+").join(" ");
            var description = display[i].description;
            console.log(title, description)
            if (description !== null){
                var btn = $("<button>").text(title).attr("data-desc", description).addClass("historyBtn btn mb-3 mx-1");
                $("#historyDisplay").append(btn);
            }

        }

    }

}

$( document ).ready(function() {
    displayHistory();
});

//Click on History button
$("body").on("click", ".historyBtn", function (){
    var title = $(this).text();
    var info = $(this).attr("data-desc")
    console.log(title)
    $("#label").text(title);
    $("#info").text(info)

    responsiveVoice.cancel();

    var elmnt = document.getElementById("label");
    elmnt.scrollIntoView();

})


//Click to play/ pause / resume play text in "#test"
$("#play").on("click", function(){
    // need to change this to appropriate field on html
    var text = $("#info").text().trim(); 

    console.log("text2speech: " + text)
    
    // Set up play/ pause / resume function
    var isPlaying = responsiveVoice.isPlaying();
    console.log(isPlaying)
    
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

