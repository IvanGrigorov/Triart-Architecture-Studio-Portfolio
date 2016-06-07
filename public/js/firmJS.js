var id = 1;
var distance;
var slideNavigationTextAtBeginning;

function startAnimationOnFirtsPage() {
    var firmName = $("#firmName");
    firmName.animate({
        marginLeft: "0px"
    }, 1500, function() {
        setTimeout(moveDescriptionToLeft(), 500);
    });
}

function moveDescriptionToLeft() {
    var firmDescription = $("#firmDescription");
    var marginToMove = (($("#firmDescription").css("margin-left").replace("px", "") | 0) + ($("#firmDescription").css("margin-right").replace("px", "") | 0)) / 2;
    firmDescription.animate({
        marginRight: marginToMove
    }, 1200, function() {
        setTimeout(showLine(), 500);
    });
}

$(document).ready(function() {
    distance = Math.floor($("#main").outerHeight(true) / 3);
    startAnimationOnFirtsPage();
    slideNavigationTextAtBeginning = $("#sideNavigation").text();
});

function showArrow(liElement) {
    var arrowImage = $(liElement + " .arrow > img");
    arrowImage.animate({
        height: "90px"
    }, 1000);
}

function showLine() {
    $($("hr")[6]).css('visibility', 'visible').hide().fadeIn(700, "linear", showArrow("#1"));
}




function startAnimationOnSecondPage() {
    var firmName = $("#education");
    firmName.animate({
        left: "0px"
    }, 1500, function() {
        setTimeout(moveExpToLeft(), 500);
    });
}

function moveExpToLeft() {
    var firmDescription = $("#exp");
    firmDescription.animate({
        right: "0px"
    }, 1200, function() {
        setTimeout(showLines(), 500);
    });
}

function showLines() {
    $($("hr")[7]).css('visibility', 'visible').hide().fadeIn(700, "linear");
    $($("hr")[8]).css('visibility', 'visible').hide().fadeIn(700, "linear", showArrow("#2"));
}

function callCustomFunction(functionName) {
    var codeToExecute = functionName;
    var tmpFunc = new Function(codeToExecute);
    tmpFunc();
}

function startAnimationOnThirdPage() {
    var firmName = $("#skills");
    firmName.animate({
        left: "0px"
    }, 1500, function() {
        setTimeout(moveMiscToLeft(), 500);
    });
}

function moveMiscToLeft() {
    var firmDescription = $("#misc");
    firmDescription.animate({
        right: "0px"
    }, 1200, function() {
        setTimeout(showThirdLines(), 500);
    });
}

function showThirdLines() {
    $($("hr")[9]).css('visibility', 'visible').hide().fadeIn(700, "linear");
    $($("hr")[10]).css('visibility', 'visible').hide().fadeIn(700, "linear");
}

if ($(window).width() > 1300) {
    $("html, body").css({
        "margin": "0",
        "height": "100%",
        "overflow": "hidden"
    });
    $("#sideNavigation").css("display", "block");
    $(window).bind('mousewheel DOMMouseScroll ', function(e) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            if (id == 1) {
                return;
            } else {
                id--;
                $("#main").animate({
                    top: "+=" + distance
                }, 2000, window[$("#" + id).prop("title")]());
                $("#sideNavigation").hide();
                $("#sideNavigation").fadeIn(1500, changeSideNavigationText(id));
            }
        } else {
            if (id == 3) {
                return;
            } else {
                id++;
                $("#main").animate({
                    top: "-=" + distance
                }, 2000, window[$("#" + id).prop("title")]());
                $("#sideNavigation").hide();
                $("#sideNavigation").fadeIn(1500, changeSideNavigationText(id));
            }
        }
        if (id == 1) {
            $("#sideNavigation").css({
                top: '25%'
            });
        } else {
            $("#sideNavigation").css({
                top: '5%'
            });
        }
    });
} else {
    var $divCollection = $("div");
    var divCollectionLength = $divCollection.length;
    for (var i = 0; i < divCollectionLength; i += 1) {
        var element = $($divCollection[i]);
        element.css({
            "left": "0px",
            "right": "0px"
        });
    }
    var $arrowsCollection = $(".arrow");
    var arrowCollectionLength = $arrowsCollection.length;
    for (var i = 0; i < arrowCollectionLength; i += 1) {
        var element = $($arrowsCollection[i]);
        element.hide();
    }
    var $liElementsCollection = $("#main > li");
    var liElementsCollectionLength = $liElementsCollection.length;
    for (var i = 1; i < liElementsCollectionLength; i += 1) {
        var element = $($liElementsCollection[i]);
        element.css("height", "auto");
    }
    $("#main").css("height", "auto");
    var $slidesCollection = $("#main > li");
    var slidesCollectionLenght = $slidesCollection.length;
    for (var i = 0; i < slidesCollectionLenght; i += 1) {
        var $currentElement = $($slidesCollection[i]);
        $currentElement.css("height", "auto");
    }
    $("footer").css("position", "relative");
}

function changeSideNavigationText(slide) {
    switch (slide) {
        case 1:
            $("#sideNavigation").text(slideNavigationTextAtBeginning);
            break;

        case 2:
            if (slideNavigationTextAtBeginning === "Triart Studio") {
                $("#sideNavigation").text("Yanco Yonchev");
            } else {
                $("#sideNavigation").text("Янко Йончев");
            }
            break;

        case 3:
            if (slideNavigationTextAtBeginning === "Triart Studio") {
                $("#sideNavigation").text("What we are good at");
            } else {
                $("#sideNavigation").text("В какво сме добри");
            }
            break;
    }
}