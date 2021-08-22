var documentHeight;

$(document).ready(function() {

    documentHeight = $(window).height();

    function sectionHeight() {
        $(".section").height(documentHeight);
    }

    $(sectionHeight);

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

    if (id === "buttonSection01") {
        console.log("entrou primeiro if")
        console.log("id: "+$(".bottom-arrow-icon").attr("id"))
        $("html, body").animate({scrollTop: documentHeight}, 500);
    }
    else if (id === "buttonSection02") {
        console.log("entrou segundo if")
        $("html, body").animate({scrollTop: documentHeight * 2}, 500);
    }
    else if (id === "buttonSection03") {
        $("html, body").animate({scrollTop: documentHeight * 3}, 500);
    }
    else if (id === "buttonSection04") {
        $("html, body").animate({scrollTop: documentHeight * 4}, 500);
    }

}