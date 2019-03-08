function callWikiAPI (){
    //grab search query string from image search result
    var searchWiki; // need to grab this from somwhere on html or need to return from Google Vision JSON Call
    console.log(search)
    
    
    // query currently hardcoded for Mona Lisa
    var wikiQueryURL = "https://en.wikipedia.org/w/api.php?format=json&redirects=1&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + searchWiki
    
    $.ajax({
        url: wikiQueryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
        var pages = response.query.pages
        var pagesArray = Object.values(pages)
        var extract = pagesArray[0].extract // this is the extract to be used to populate the page
        console.log(extract)

        // Enters code for populating page on screen


        
    });

}
