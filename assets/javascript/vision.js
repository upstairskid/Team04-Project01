window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('image');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to file url
      }
  });
});




// function to convert image to base64 encoding
function encodeImageFileAsURL(element) {
   
  var file = element.files[0];
  var src = URL.createObjectURL(file)
  $("#image").attr("src", src);

    var reader = new FileReader();
    reader.onloadend = function() {
    console.log('RESULT', reader.result)
    var encodedImg =  reader.result;
    var queryImg = encodedImg.split("data:image/jpeg;base64,").pop();
    visionAJAX(queryImg);
    }
    reader.readAsDataURL(file);
}

function visionAJAX(img){
    var dataToSend = JSON.stringify({
        requests: [
            {
              features: [
                { type: "WEB_DETECTION", maxResults: 1 }
              ],
              image: {
                content : img
              }
            }
        ]
    });


    $.ajax({
        url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAkxv4g-b-Ox485m5na9NYx7yfAXoCbYfc",
        method: "POST",
        contentType: "application/json",
        processData: false,
        data: dataToSend,
        success: function (response) {
            console.log(response);
            var label = response.responses[0].webDetection.webEntities[0].description;
            $("#label").empty();
            $("#label").text(label);
            console.log(label);
            callWikiAPI();
        },
    });
 
};

