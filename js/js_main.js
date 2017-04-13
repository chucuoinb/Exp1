$(function () {
    $("input").focusin(function () {
        $(this).val("");
        $(this).css("color", "#444444")
    });
    $("#1").focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).val("Search entrie store here...");
            $(this).css("color", "#CCCCCC")
        }
    })
    $("#2").focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).val("Enter your email address");
            $(this).css("color", "#CCCCCC")
        }
    })
    $("#submitEmail").click(function () {
        var em = $(".email input").val();
        if ($.trim(em).length == 0) {
            alert("Please enter your email");
            e.preventDefault();
        }
        if (!(validateEmail(em))) {
            alert("Error email form");
        }
        else {
            alert("Thank you");
            e.preventDefault();
        }
    });
    var index = 0,
        lastIndex = 0,
        $slide = $(".slideshow"),
        $dot = $(".dotE"),
        setInt;
    $slide.hide().eq(index).show();
    $dot.eq(index).css("border", "5px solid #919595");
    function fadefn(index, time) {
        fadeDot(index - 1);
        $slide.fadeOut(time).eq(index).stop().fadeIn(time);
    }

    function fadeDot(index1) {
        $dot.eq(index1 % 4).css("border", "5px solid #CCCCCC");
        $dot.eq((index1 + 1) % 4).css("border", "5px solid #919595");
    }

    function stopInt() {
        clearInterval(setInt);
    }

    function startInt() {
        setInt = setInterval(
            function () {
                index++;
                if (index > 3)
                    index = 0;
                lastIndex = index;
                fadefn(index, 3000)
            }, 6000);
    }

    $(".dotE").click(function () {
        index = $(".dotE").index(this);
        $slide.hide().eq(index).fadeIn(1000);
        $dot.css("border", "5px solid #CCCCCC").eq(index).css("border", "5px solid #919595");
    })
    $slide.hover(stopInt, startInt);
    startInt();
    $("#next").click(function () {
        index++;
        if (index > 3)
            index = 0;
        fadefn(index, 1000)
    })
    $("#back").click(function () {
        $dot.eq(index % 4).css("border", "3px solid #CCCCCC");
        index--;
        if (index < 0)
            index = 3;
        $dot.eq((index) % 4).css("border", "5px solid #919595");
        $slide.fadeOut(1000).eq(index).stop().fadeIn(1000);
    })
    var wtd = parseInt($(".it").css("width")) + 12;
    slideItem($("#backItem"), $(".it"), -wtd);
    slideItem($("#nextItem"), $(".it"), +wtd);
    slideItem($("#backItem1"), $(".itt"), -wtd);
    slideItem($("#nextItem1"), $(".itt"), +wtd);
    $(".mmenu").click(function () {
        $(".mmenu").removeClass("active");
        $(this).addClass("active");
    });
    $(".mmenu1").click(function () {
        $(".mmenu1").removeClass("active1");
        $(this).addClass("active1");
    });
});
var checksum = 0;
function slideItem(bt, Group, param) {
    bt.click(function () {
        if (param > 0 && checksum == 0)
            animateNext(Group, param);
        else if (param < 0 && checksum == 0)
            animateBack(Group, param);
    })
};
function animateNext(group, param) {
    checksum = 1;
    group.each(function (i, e) {
        $(e).animate(
            {
                left: parseInt($(e).css("left")) + param,
            }, 350, function () {
                if (parseInt($(e).css("left")) > (param * 4 + 100)) {
                    $(e).css("left", "-252px");
                }
                checksum = 0;
            }
        );
    });
}
function animateBack(group, param) {
    group.each(function (i, e) {
        checksum = 1;
        $(e).animate(
            {
                left: parseInt($(e).css("left")) + param,
            }, 350, function () {
                if (parseInt($(e).css("left")) < (param - 100)) {
                    $(e).css("left", "1008px");
                }
                checksum = 0;
            }
        );
    });
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
/**
 * Created by MToan on 4/4/2017.
 */
