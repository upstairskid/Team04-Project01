//grab search query string from image search result
var search;
console.log(search)


// query currently hardcoded for Mona Lisa
var wikiQueryURL = "https://en.wikipedia.org/w/api.php?format=json&redirects=1&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + search

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
});
