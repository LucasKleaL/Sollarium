var documentHeight;

$(document).ready(function() {

    documentHeight = window.screen.height;

    function sectionHeight() {
        $(".section").height(documentHeight);
    }

    //$(sectionHeight);

    $(".icon-cubesat-desc").hover(function() {

        var getId = this.id;
        console.log("hover")

        for (var i = 0; i < subsystemsData.length; i++) {

            if (getId === subsystemsData[i][0]) {
                $(".h1-subsistem-title").text(subsystemsData[i][1]);
                $(".p-subsistem-desc").empty();
                $(".p-subsistem-desc").append(subsystemsData[i][2]);
            }

        }

    })

});

function sectionScroll(id) {

    var scrollHeight;

    if (id === "buttonSection01") {
        var section1 = document.getElementById("section01");
        var scrollHeight01 = section1.offsetHeight;
        $("html, body").animate({scrollTop: scrollHeight01 + scrollHeight01 * 0.1}, 500)
    }
    else if (id === "buttonSection02") {
        var section1 = document.getElementById("section01");
        var section2 = document.getElementById("section02");
        scrollHeight = section1.offsetHeight + section2.offsetHeight;
        $("html, body").animate({scrollTop: scrollHeight + scrollHeight * 0.1}, 500);
    }
    else if (id === "buttonSection03") {
        $("html, body").animate({scrollTop: documentHeight * 3}, 500);
    }
    else if (id === "buttonSection04") {
        $("html, body").animate({scrollTop: documentHeight * 4}, 500);
    }

}