// rendering history
function displayHistory(){
    var display = JSON.parse(localStorage.getItem("history"));
    if (display !== null){
        for (var i = 0; i < display.length; i++ ){
            var title = display[i].title.split("+").join(" ");
            var description = display[i].description;
            console.log(title, description)
            var btn = $("<button>").text(title).attr("data-desc", description).addClass("historyBtn btn");
            $("#historyDisplay").append(btn);

        }

    }

}

$( document ).ready(function() {
    displayHistory();
});