/// SET the RSS link here 
var url = "http://www.wpbeginner.com/feed/";

function parseRSS(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            if (callback) {
                callback(data.responseData.feed);
            }
        }
    });
}

function callback(response) {
    $("#url").html(response.link);
    $("#title").html(response.title);
    $("#desc").html(response.description);

    var article = "";

    for (var i = 0, max = response.entries.length; i < max; i++) {
        article = "<li><a alt=\"" + response.entries[i].contentSnippet +
                "\" target=\"_blank\" href=\"" + response.entries[i].link +
                "\">" + response.entries[i].title +
                "</a><div>" +
                response.entries[i].contentSnippet
                + "</div></li>";
        $("#articles").append(article);
    }
}

$(document).ready(function () {
    console.log("ready!");
    parseRSS(url, callback);
});