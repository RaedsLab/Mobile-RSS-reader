/// SET the RSS link here 
var url = "http://www.raed.tn/blog/feed/";
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
    var article = "";
    var featImage = "";
    var srcimg;
    var imgLink = "";
    ///BLOG INFO
    $("#url").html(response.link);
    $("#title").html(response.title);
    $("#desc").html(response.description);

    //GO THROUGH THE ARTICLES
    for (var i = 0, max = response.entries.length; i < max; i++) {
        featImage = response.entries[i].content;

        srcimg = $(featImage).find('img');

        if (srcimg.length > 0) {
            imgLink = srcimg[0].src;
        } else {
            imgLink = "https://placeholdit.imgix.net/~text?txtsize=11&txt=120%C3%97120&w=120&h=120";
        }
        
        article += "<li class=\"ui-li-has-alt ui-li-has-thumb \">" +
                "<a href=\"" + response.entries[i].link + "\" target=\"_blank\" class=\"ui-btn\">\n\
         <img src = \"" + imgLink + "\" >\n\
         <h2>" + response.entries[i].title + "</h2>\n\
         <p>" + response.entries[i].contentSnippet + "</p></a></li>";
    }
    $("#articles").append(article).listview('refresh');
}

$(document).ready(function () {
    console.log("ready!");
    parseRSS(url, callback);
    $("li").each(function (index) {
        console.log(index + ": " + $(this).text());
        $(this).enhanceWithin();
    });
});

$("#refresh").click(function () {
    $("#articles").html("");
    parseRSS(url, callback);
    $("li").each(function (index) {
        console.log(index + ": " + $(this).text());
        $(this).enhanceWithin();
    });
});