var dropped = false;
var $dropDown = $('.navbar .dropdown');
var show = false;
var $loader = $('#loader');


$('#carousel-one-generic').carousel({
    interval: 6500
});

$('#carousel-two-generic').carousel({
    interval: 4000
});

$('#carousel-three-generic').carousel({
    interval: 15000
});

$('#carousel-four-generic').carousel({
    interval: 12000
});

$('#carousel-five-generic').carousel({
    interval: 9500
});

$('#carousel-six-generic').carousel({
    interval: 8000
});

$(document).ready(function() {
    $loader.fadeOut(2000);
    createElegantDropDown();
    createAnimatedContacts();
    sliderRefImages();
    eventOnDeleteProject();

});

function createElegantDropDown() {
    $('.navbar .dropdown').click(function(event) {
        event.stopPropagation();
        dropped = !dropped;
        console.log(dropped);
        $(this).find('.dropdown-menu').slideToggle(600);
        if (dropped) {
            $('.navbar .dropdown').addClass('open');
        } else {
            setTimeout(function() {
                $('.navbar .dropdown').removeClass('open');
            }, 600);
        }
    });

    $(document).click(function() {
        dropped = false;
        $('.dropdown-menu').slideUp(600);
        window.setTimeout(function() {
            $dropDown.removeClass('open');
        }, 600);
    });
}

function createAnimatedContacts() {
    $('.Icons').click(function(eventExm) {
        eventExm.stopPropagation();
        $(this).prev().slideToggle(600);
    });
    $(document).click(function() {
        $('.Icons').prev().slideUp(600);
    });


    $('#adress').click(function(eventNextExm) {
        eventNextExm.stopPropagation();
        if (!show) {
            $('#map').fadeIn(2000).css('display', 'inline-block');
            show = !show;
        } else {
            $('#map').fadeOut(2000)
            show = !show;
        }
    });

    $(document).click(function() {
        $('#map').fadeOut(2000);
        show = false;
    });
}

function sliderRefImages() {
    var id = $(".sliderOne").val();
    var sliderValue = $(".sliderOne").val();
    if ($(window).width() < 1000) {
        id = 1;
        sliderValue = 1;
        $("#test").css("width", "300px");
    }
    $("#test").tooltip({
        container: 'body',
        trigger: 'manual'
    });
    $(".ref > li > img").css({
        "width": "65%",
        "height": "65%"
    });
    $("#" + sliderValue).children("img").css({
        "width": "100%",
        "height": "100%"
    });
    var allPictures = $(".ref").children("*");
    var element = $(allPictures[0]);
    var last = allPictures.length - 1;
    var lenght = allPictures.length;
    $("#test").attr('data-original-title', $("#" + id).prop("title")).tooltip('fixTitle');
    $("#test").tooltip("show");
    var first = allPictures.length;
    $(".sliderOne").on("input", function(e) {
        console.log($(".sliderOne").val());
        if (($(".sliderOne").val() | 0) > (sliderValue | 0)) {
            console.log("yes");
            allPictures.animate({
                left: "+=" + (element.outerWidth(true))
            });

            $('#' + last).animate({
                left: -(last * (element.outerWidth(true)))
            }, 0);

            first -= 1;
            if (first < 1) {
                first = lenght;
            };
            last -= 1;
            if (last < 1) {
                last = lenght;
            };
            id -= 1;
            if (id < 1) {
                id = lenght;
            };
            sliderValue = $(".sliderOne").val();
        } else if (($(".sliderOne").val() | 0) < (sliderValue | 0)) {
            allPictures.animate({
                left: "-=" + (element.outerWidth(true))
            });
            $('#' + first).animate({
                left: ((lenght - 1) - first) * (element.outerWidth(true))
            }, 0);
            last += 1;
            if (last > lenght) {
                last = 1;
            };
            first += 1;
            if (first > lenght) {
                first = 1;
            };
            id += 1;
            if (id > lenght) {
                id = 1;
            };
            sliderValue = $(".sliderOne").val();
        }
        $(".ref > li > img").css({
            "width": "65%",
            "height": "65%"
        });
        $("#" + id).children("img").css({
            "width": "100%",
            "height": "100%"
        });
    });
    $(".sliderOne").on("mouseup change", function() {
        $("#test").attr('data-original-title', $("#" + id).prop("title")).tooltip('fixTitle');
        $("#test").tooltip("show");
    });


}

function eventOnDeleteProject() {
    $(".deleteProject").on("click", function() {
        $headerConetanier = $(this).prev();
        //console.log($headerConetanier);
        $titleOfProject = $headerConetanier.find("a").text();
        //$categoryOfProject = $("#category").text();
        $urlToSend = window.location.href;
        var dataToSend = {
            title: $titleOfProject
                //category: $categoryOfProject
        };
        //var dataStringified = JSON.stringify(dataToSend);
        //console.log(dataStringified);
        $.post($urlToSend, dataToSend).success(function(data) {
            console.log(data);
            window.location.href = data.redirect;
        })
    })
}