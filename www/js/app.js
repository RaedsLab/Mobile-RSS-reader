/// SET the RSS link here 
var url = "https://news.microsoft.com/feed/";
var loaded = false; // to prevent re-redering the list
//ALL your articles will go here
var content = new Array();


function parseRSS(url, callback) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            if (callback) {
                callback(data.responseData.feed);
                loaded = true;
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
        content[i] = response.entries[i];

        if (srcimg.length > 0) {
            imgLink = srcimg[0].src;
        } else {
            imgLink = "https://placeholdit.imgix.net/~text?txtsize=11&txt=120%C3%97120&w=120&h=120";
        }

        article += "<li  class=\"ui-li-has-alt ui-li-has-thumb \">" +
                "<a href=\"" + response.entries[i].link + "\" target=\"_blank\" class=\"ui-btn\">\n\
         <img src = \"" + imgLink + "\" >\n\
         <h2>" + response.entries[i].title + "</h2>\n\
         <p>" + response.entries[i].contentSnippet + "</p>" +
                '<a onclick="articleClicked(' + i + ')" id="art_' + i + '" href="#articlePage" class = "ui-btn ui-btn-icon-notext ui-icon-action art">\n\
                 < /a> < /li>';
    }
    $("#articles").append(article).listview('refresh');
}

function articleClicked(i) {

    $("#articleTitle").html(content[i].title);

    $("#articleContent").html(content[i].content).trigger('create');
    ;
}

$(document).on('pageinit', function () { //jQ Mobile replacement for $(document).ready
    console.log("ready!");
    if (loaded) {
        return;
    }
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