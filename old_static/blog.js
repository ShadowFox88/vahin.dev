let blogPosts = ["inital-post.md"];
let previewCharacters = 300;

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }

    return result;
}

