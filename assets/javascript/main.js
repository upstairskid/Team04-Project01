// loadScript

function loadScript(path, callback) {

    var done = false;
    var scriptElement = document.createElement('script');

    scriptElement.onload = handleLoad;
    scriptElement.onreadystatechange = handleReadyStateChange;
    scriptElement.onerror = handleError;
    scriptElement.src = path;
    document.body.appendChild(scriptElement);

    function handleLoad() {
        if (!done) {
            done = true;
            callback(path, "ok");
        }
    }

    function handleReadyStateChange() {
        var state;

        if (!done) {
            state = scriptElement.readyState;
            if (state === "complete") {
                handleLoad();
            }
        }
    }
    function handleError() {
        if (!done) {
            done = true;
            callback(path, "error");
        }
    }
}

function speech(){
    loadScript("assets/javascript/text_to_speech.js");
}

function mediawiki(){
    loadScript("assets/javascript/mediawiki.js", speech);
}

function vision(){
    loadScript("assets/javascript/vision.js", mediawiki);
}

// load global dependencies
function jQuery(){
    // load jquery
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', vision);

}


window.addEventListener("load", jQuery);


