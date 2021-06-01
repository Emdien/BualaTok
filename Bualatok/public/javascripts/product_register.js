function previewImage() {

    let file = document.getElementById("file").files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function(event) {
            document.getElementById("preview").setAttribute("src", event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
    }
}


window.onload = function() {

    var inputFile = document.getElementById("file");
    inputFile.addEventListener("change", previewImage);
    
}