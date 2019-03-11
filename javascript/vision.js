// function to convert image to base64 encoding
function encodeImageFileAsURL(element) {
    var file = element.files[0];
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
        },
    });
 
};
