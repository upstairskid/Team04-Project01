
  var input = document.getElementById("selectedImage");
  
  input.addEventListener("change", handleFiles);
  
  function handleFiles(e) {
    responsiveVoice.cancel();

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
      var reader = new FileReader;
      reader.onload = function (event) {
          var img = new Image();
          img.src = reader.result;
          img.onload = function () {
              var maxWidth = 500,
                  maxHeight = 500,
                  imageWidth = img.width,
                  imageHeight = img.height;
  
              if (imageWidth > imageHeight) {
                  if (imageWidth > maxWidth) {
                      imageHeight *= maxWidth / imageWidth;
                      imageWidth = maxWidth;
                  }
              } else {
                  if (imageHeight > maxHeight) {
                      imageWidth *= maxHeight / imageHeight;
                      imageHeight = maxHeight;
                  }
              }
              canvas.width = imageWidth;
              canvas.height = imageHeight;
  
              ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
  
              // The resized file ready for upload
              var encodedImg = canvas.toDataURL("image/jpeg");
              var queryImg = encodedImg.split("data:image/jpeg;base64,").pop();
              console.log(encodedImg)
  
              visionAJAX(queryImg);
  
              var display = document.querySelector('#image');
              display.src = encodedImg;
  
              };
          }        
      reader.readAsDataURL(e.target.files[0]);
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
            $("#label").text(label);
            console.log(label);
            callWikiAPI();
        },
    });
 
};

