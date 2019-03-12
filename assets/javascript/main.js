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
    loadScript("./assets/javascript/text_to_speech.js");
}

function firebase(){
    loadScript("./assets/javascript/updated_firebase_app.js", speech);
}

function mediawiki(){
    loadScript("./assets/javascript/mediawiki.js", firebase);
}

function vision(){
    loadScript("./assets/javascript/vision.js", mediawiki);
}

function upload(){
    loadScript("./assets/javascript/upload.js", vision);
}


// load global dependencies
function loadGlobalDependencies(){
    // load jquery
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',upload);

}


window.addEventListener("load",loadGlobalDependencies);


