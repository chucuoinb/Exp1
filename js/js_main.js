var speed = 300;
var srcItemBanner = "../images/item";
var positionItemMinBanner = 0;
var positionItemMaxBanner = 0;
var numberOfItemBanner = 8;
var idListItemBanner = "#list_item";
var positionItemMinProduct = 0;
var positionItemMaxProduct = 5;
var numberOfItemProduct = 8;
var idListItemProduct = "#list_item_right";
var numberDisplayItemProduct = 4;
var positionItemMinProductEnd = 0;
var positionItemMaxProductEnd = 4;
var numberOfItemProductEnd = 8;
var idListItemProductEnd = "#list_item_product";
var idItemProductEnd = "#list_item_product_img";
var numberDisplayItemProductEnd = 3;
var numberDisplayItemBanner = 1;
var idItemBanner = "#img";
var idItemProduct = "#list_item_right_img";
var click = false;
var timeOutMove;
var positionLagre;
var idPrice = "#list_item_product_price";
var positionVote = -1;
var srcItemCart;
var numberOfItemCart;
var listItem = new Array();
var price;
var checkExistItem = false;
var flagRegister = true;
var flagAvatar = false;
$(function () {
    // $("input").focusin(function () {
    //     $(this).val("");
    //     $(this).css("color", "#444444")
    // });
    // alert(loadJson());
    // loadCart();
    // $("#input_phone_number").change(function () {
    //         validatePhoneNumber();
    //
    // });
    $("#bt_choose_ava").change(function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            var image = $("#img_avatar").attr("src", e.target.result);
            var width = $('#img_avatar').prop('naturalWidth');
            var height = $('#img_avatar').prop('naturalHeight');
            // alert(width +":"+height)
            if(width == 0 || height ==0){
                flagAvatar = false;
                $("#register_avatar_error").text("File bạn chọn không phải là ảnh");
                $("#img_avatar").removeAttr("src");
                $("#bt_choose_ava").val("");
                $("#input_avatar").css("display","none");
            }else {
                $("#register_avatar_error").text("");
                $("#input_avatar").css("display","block");
                flagAvatar = true;
            }
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    });
    loadTotalPrice();
    loadDay();
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

    $("#banner_bt_next").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMinBanner == 0)
                positionItemMinBanner = numberOfItemBanner - 1;
            else positionItemMinBanner--;
            nextItem(positionItemMinBanner, $(".banner_items"), srcItemBanner, 1, idItemBanner, idListItemBanner);
        }
    })

    $("#banner_bt_pre").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMaxBanner == numberOfItemBanner - 1)
                positionItemMaxBanner = 0;
            else positionItemMaxBanner++;
            preItem(positionItemMaxBanner, $(".banner_items"), srcItemBanner, 1, idItemBanner, idListItemBanner);

        }
    })

    $("#product_bt_next").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            positionLagre = positionItemMinProduct;
            if (positionItemMinProduct == 0) {
                positionItemMinProduct = numberOfItemProduct - 1;
            }

            else {
                positionItemMinProduct--;
            }
            if (positionItemMaxProduct == 0)
                positionItemMaxProduct = numberOfItemProduct - 1;
            else
                positionItemMaxProduct--;
            // if (positionItemMinProduct == numberOfItemProduct -1){
            //
            //     positionLagre = 0;
            // }
            // else
            //     positionLagre = positionItemMinProduct +1;
            nextItem(positionItemMinProduct, $(".list_item_right"), srcItemBanner, numberDisplayItemProduct, idItemProduct, idListItemProduct);
            changeLargeItem(positionLagre);

        }
    })

    $("#product_bt_pre").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMaxProduct == numberOfItemProduct - 1) {
                positionItemMaxProduct = 0;
            }

            else {
                positionItemMaxProduct++;
            }
            if (positionItemMinProduct == numberOfItemProduct - 1)
                positionItemMinProduct = 0;
            else
                positionItemMinProduct++;

            if (positionItemMaxProduct >= numberDisplayItemProduct)
                positionLagre = positionItemMaxProduct - numberDisplayItemProduct;
            else
                positionLagre = positionItemMaxProduct - numberDisplayItemProduct + numberOfItemProduct;
            preItem(positionItemMaxProduct, $(".list_item_right"), srcItemBanner, numberDisplayItemProduct, idItemProduct, idListItemProduct);
            changeLargeItem(positionLagre);
        }
    })

    $(".list_item_right").click(function () {
        var src = $(idItemProduct + $(".list_item_right").index(this)).attr("src");
        $("#item_large >img").attr("src", src);
        $.get("../json/storeUser.php", function (data) {
            var list = JSON.parse(data);
            for (var i = 0; i < list.length; i++) {
                if ((srcItemBanner + list[i]["index"] + ".png") == src) {

                    $("#price_item_large").text(list[i]["price"]);
                    break;
                }
            }
        })
        $(".list_item_right").removeClass("display");
        $(".list_item_right").eq($(".list_item_right").index(this)).addClass("display");
    });

    //vote
    $(".bt_vote").click(function () {
        var index = $(".bt_vote").index(this);
        // if (index == positionVote) {
        //     deleteVote();
        //     positionVote = -1;
        // } else {
        //
        //     positionVote = index;
        changeVote(index);
        // }
    });

    //tab
    $(".tab").click(function () {
        var index = $(".tab").index(this);
        $(".tab").removeClass("tab_choose");
        $(".tab").eq(index).addClass("tab_choose");
        displayTab(index);
    });

    // /add cart
    $("#bt_add_cart").click(function () {
        if (checkNumber()) {
            srcItemCart = $("#img_item_large").attr("src");
            numberOfItemCart = parseInt($("#number_of_item").val());
            var price = $("#price_item_large").text();
            addCart(srcItemCart, numberOfItemCart, price)
        }
    });

    $(".bay").click(function () {
        var index = $(".bay").index(this);
        var src = $(idItemProductEnd + index).attr("src");
        var price = $(idPrice + index).text()
        addCart(src, 1, price);
        // alert(src)
    });

    //delete

    $("#menu_card").hover(function () {
        $(".cart").remove();
        loadCart();
    }, function () {
        $(".cart").remove();
    });

    $("#next_product_end").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMinProductEnd == 0) {
                positionItemMinProductEnd = numberOfItemProductEnd - 1;
            }

            else {
                positionItemMinProductEnd--;
            }
            if (positionItemMaxProductEnd == 0)
                positionItemMaxProductEnd = numberOfItemProductEnd - 1;
            else
                positionItemMaxProductEnd--;
            nextItem(positionItemMinProductEnd, $(".list_item_product"), srcItemBanner, numberDisplayItemProductEnd, idItemProductEnd, idListItemProductEnd);

        }
    });
    $("#pre_product_end").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMinProductEnd == numberOfItemProductEnd - 1) {
                positionItemMinProductEnd = 0;
            }

            else {
                positionItemMinProductEnd++;
            }
            if (positionItemMaxProductEnd == numberOfItemProductEnd - 1)
                positionItemMaxProductEnd = 0;
            else
                positionItemMaxProductEnd++;
            preItem(positionItemMinProductEnd, $(".list_item_product"), srcItemBanner, numberDisplayItemProductEnd, idItemProductEnd, idListItemProductEnd);

        }
    });

    $("#form_review").submit(function () {
        return validateForm();
    });
    $("#form_register").submit(function () {
        return validateRegister();
    });
    // $("#submit_register").click(function () {
    // });
    $("#newsletter_input_email").change(function () {
        // alert(this.id)
        if (!checkEmail($("#newsletter_input_email").val())) {
            $("#newsletter_input_email_error").text("Email nhập sai");
            $("#newsletter_input_email_true").css("display", "none");
        } else {
            $("#newsletter_input_email_error").text("");
            $("#newsletter_input_email_true").css("display", "inline-block");
        }
    });
    $(document).on("click", '.bt_delete_item', function () {

        var index = $(".cart").index(this);
        // alert(index)
        deleteItem($(".img_cart").eq(index).attr("src"));
        $(".cart").eq(index).remove();

    })
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
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
}
function nextItem(position, listItem, srcItem, maxItemDisplay, id, idList) {
    var widthItem = parseFloat(listItem.eq(0).css("width"));
    var widthContainer = parseFloat($(idList).css("width"));
    var paddingItem;
    if (maxItemDisplay == 1)
        paddingItem = widthContainer - widthItem;
    else paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);

    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "+=" + getLeftItem(1, paddingItem, widthItem)}, speed, function () {
            if (parseInt(item.css("left")) > getLeftItem(maxItemDisplay, paddingItem, widthItem)) {
                item.css("left", getLeftItem(-1, paddingItem, widthItem));
                $(id + index).attr("src", srcItem + position + ".png");
                $.get("../json/storeUser.php", function (data) {
                    var list = JSON.parse(data);
                    for (var i = 0; i < list.length; i++) {
                        if ((list[i]["index"] == position))
                            $(idPrice + index).text(list[i]["price"]);
                    }
                })
            }
            if (id = idItemProduct)
                changeBorder();
        })
    });
}
function preItem(position, listItem, srcItem, maxItemDisplay, id, idList) {

    var widthItem = parseFloat(listItem.eq(0).css("width"));
    var widthContainer = parseFloat($(idList).css("width"));
    var paddingItem;
    if (maxItemDisplay == 1)
        paddingItem = widthContainer - widthItem;
    else paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);

    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "-=" + getLeftItem(1, paddingItem, widthItem)}, speed, function () {
            if (parseInt(item.css("left")) < getLeftItem(-1, paddingItem, widthItem)) {
                item.css("left", getLeftItem(maxItemDisplay, paddingItem, widthItem));
                $(id + index).attr("src", srcItem + position + ".png");
                $.get("../json/storeUser.php", function (data) {
                    var list = JSON.parse(data);
                    for (var i = 0; i < list.length; i++) {
                        if ((list[i]["index"] == position))
                            $(idPrice + index).text(list[i]["price"]);
                    }
                })
            }
            if (id = idItemProduct)
                changeBorder();
        })
    });
}
function getLeftItem(position, paddingItem, widthItem) {
    return position * (widthItem + paddingItem);
}
function changeLargeItem(position) {
    $.get("../json/storeUser.php", function (data) {
        var list = JSON.parse(data);
        $("#price_item_large").text(list[position]["price"]);
    })
    $("#item_large>img").attr("src", srcItemBanner + position + ".png");
}
function changeBorder() {
    var list = $(".list_item_right");

    list.each(function (index, object) {
        var item = $(object);
        var left = parseInt(item.css("left"));
        if (left == 0)
            item.addClass("display");
        else
            item.removeClass("display");

    })
}
function changeVote(position) {
    $(".bt_vote").each(function (index, object) {
        var vote = $(object)
        if (index <= position) {
            if (!vote.hasClass("vote")) {
                vote.addClass("vote");
            }
        }
        else if (vote.hasClass("vote")) {
            vote.removeClass("vote");
        }
    });
}
function deleteVote(position) {
    $(".bt_vote").removeClass("vote");
}
function displayTab(index) {
    $(".content_tab").removeClass("tab_display");
    $(".content_tab").eq(index).addClass("tab_display");
}
function addItem(src, price, value, name) {
    var strCart = "<li class='cart'>" +
        "<a href='#asda'>" +
        "<div class='itemincard'>" +
        "<div class='de'>" +
        "<div class='igItem'>" +
        "<a href='#As'><img class='img_cart' src='" +
        src +
        "'></a>" +
        "</div>" +
        "<div class='detail'>" +
        "<a href='#12'><p>" +
        name +
        "</p></a>" +
        "<a href='#12'><p>" +
        value +
        " x $" +
        price +
        " = $" +
        (parseInt(value) * parseInt(price)) +
        "</p></a>" +
        "</div>" +
        "<div class='cancel'>" +
        "<div title='delete' class='bt_delete_item'><i class='fa fa-times' aria-hidden='true'></i></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</a>" +
        "</li>";
    return strCart;
}

function Item() {
    this.src = "";
    this.price = "";
    this.values = 0;

    this.setInfo = function (src, price, values) {
        this.src = src;
        this.price = price;
        this.values = values;
    };

    this.addValues = function (values) {

        this.values += values;
    }


    this.getSrc = function () {
        return this.src;
    }
    this.getValues = function () {
        return this.values;

    }
    this.getPrices = function () {
        return this.price;
    }
    return this;
}
// function getCookie(key) {
//     $.cookie
// }
function loadCart() {
    // $("#sub_menu1").css("display", "none");
    if (getCookie("my_cookie") != "") {
        // alert(getCookie("my_cookie"))
        var strJson = getCookie("my_cookie");
        var listItem = JSON.parse(strJson);
        if (listItem.length == 0) {
            $("#no_item").text("Bạn chưa chọn sản phẩm nào");
        } else {
            $("#no_item").text("");
            for (var i = 0; i < listItem.length; i++) {
                $("#add_item").after(addItem(listItem[i]["src"], listItem[i]["price"], listItem[i]["values"]));
            }
        }
    }
    // $("#sub_menu1").css("display", "block");
}

function validateNickname() {
    var nickname = $("#input_nickname").val();
    var nickname_error = $("#input_nickname_error");
    if (nickname.length < 6 || nickname.length > 12) {
        nickname_error.text("Nickname có từ 6 đến 12 kí tự");
    } else {
        nickname_error.text("");
    }
}
function validateSummary() {
    var summary_error = $("#input_summary_error");
    var summary = $("#input_summary").val();
    if (summary.length < 6 || nickname.length > 12) {
        summary_error.text("Nickname có từ 6 đến 12 kí tự");
    } else {
        summary_error.text("");
    }
}
function validateReview() {
    var review_error = $("#review_text_error");
    var review = $("#review_text").val();
    if (review.length > 30) {
        review_error.text("Nhập tối đa 30 kí tự");
    } else {
        review_error.text("");
    }
}
function validateForm() {
    var flag = true;
    var nickname = $("#input_nickname").val();
    var summary = $("#input_summary").val();
    var review = $("#review_text").val();
    var nickname_error = $("#input_nickname_error");
    var summary_error = $("#input_summary_error");
    var review_error = $("#review_text_error");
    if (nickname.length < 6 || nickname.length > 12) {
        flag = false;
        nickname_error.text("Nickname có từ 6 đến 12 kí tự");
    } else {
        nickname_error.text("");
    }

    if (summary.length < 6 || nickname.length > 12) {
        flag = false;
        summary_error.text("Nickname có từ 6 đến 12 kí tự");
    } else {
        summary_error.text("");
    }

    if (review.length > 30) {
        flag = false;
        review_error.text("Nhập tối đa 30 kí tự");
    } else {
        review_error.text("");
    }
    return flag;
}
function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        return false;
    }
    else
        return true;

}

function checkNumber() {

    var flag = true;
    var values = $("#number_of_item").val();
    var error = $("#number_of_item_error");
    var filter = /^([0-9 \.\-])+$/;
    if (filter.test(values)) {
        values = parseInt(values);
        if (values <= 0) {
            error.text("Bạn cần nhập số lượng chính xác");
            flag = false;
        } else {
            error.text("");
        }
        return flag;

    }
    else {
        error.text("Bạn cần nhập số lượng chính xác");
        return false;
    }
}
function deleteItem(src) {
    var strJson = getCookie("my_cookie");
    // alert(strJson)
    var listItem = JSON.parse(strJson);
    var index;
    for (var i = 0; i < listItem.length; i++) {
        if (listItem[i]["src"] == src) {
            index = i;
            break;
        }

    }
    // alert(index)
    listItem.splice(index, 1);
    var jsonStr = JSON.stringify(listItem);
    setCookie("my_cookie", jsonStr, 1);
    loadTotalPrice()
}
function validate(id) {
    switch (id) {
        case "#number_of_item":
            checkNumber();
            break;
        case "#form_review":
            validateForm();
            break;
        case "#input_nickname":
            validateNickname();
            break;
        case "#input_summary":
            validateSummary();
            break;
        case "#review_text":
            validateReview();
            break;
    }
}
function addCart(srcItemCart, numberOfItemCart, price) {
    var listItem = new Array();
    if (getCookie("my_cookie") != "") {
        var strJson = getCookie("my_cookie");
        var listItem = JSON.parse(strJson);
        for (var i = 0; i < listItem.length; i++) {
            if (listItem[i]["src"] == srcItemCart) {
                listItem[i]["values"] += numberOfItemCart;
                checkExistItem = true;
            }
        }
        if (checkExistItem == false) {
            var item = new Item();
            item.setInfo(srcItemCart, price, numberOfItemCart)
            listItem.push(item);

        }
        checkExistItem = false;
    } else {
        var item = new Item();
        item.setInfo(srcItemCart, price, numberOfItemCart);
        listItem.push(item);
    }
    var jsonStr = JSON.stringify(listItem);
    setCookie("my_cookie", jsonStr, 1);
    loadTotalPrice();
    alert("Bạn đã thêm sản phẩm thành công");
}
function loadTotalPrice() {
    if (getCookie("my_cookie") != "") {
        var total = 0;
        var strJson = getCookie("my_cookie");
        // alert(strJson)
        var listItem = JSON.parse(strJson);
        for (var i = 0; i < listItem.length; i++) {
            total += parseInt(listItem[i]["price"]) * parseInt(listItem[i]["values"]);
        }
        $("#total_price").text(total)
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function loadJson() {
    $.get("../json/storeUser.php", function (data) {
        return data;
    })
}

function validateRegister() {
    flagRegister = true;
    console.log("empty: "+checkEmpty());
    if (!checkEmpty()){

        flagRegister = false;
    }
    console.log("mail:"+validateMail());
    if (!validateMail())
        flagRegister = false;
    console.log("user:"+validateUsername());
    if (!validateUsername())
        flagRegister = false;
    console.log("pass:"+validatePassword());
    if (validatePassword()) {
        console.log("retype:"+validateRetypePassword());
        if (!validateRetypePassword())
            flagRegister = false;
    } else {
        flagRegister = false;
    }
    console.log("phone:"+validatePhoneNumber());
    if (!validatePhoneNumber())
        flagRegister = false;
    console.log("day:"+validateBirthday($("#day").val(), $("#month").val(), $("#year").val()));
    if (!validateBirthday($("#day").val(), $("#month").val(), $("#year").val()))
        flagRegister = false;
    console.log("ava:"+checkEmptyAvatar());
    if (!checkEmptyAvatar())
        flagRegister = false;
    // if (!flagAvatar)
    //     flagRegister = false;
    if (flagRegister)
        $("#input_birthday").val(getBirthday());
    return flagRegister;
}
function checkWordSpecil(str) {
    var filter = /^([0-9a-zA-Z /_])+$/;
    return filter.test(str)
}
function checkLengh(id, message) {
    if (($.trim($("#input_" + id).val()).length) > 8 && ($.trim($("#input_" + id).val()).length) < 15) {
        $("#register_" + id + "_error").text("");
        $("#register_" + id + "_true").removeClass("register_validate");
        return true;
    } else {
        $("#register_" + id + "_error").text("Nhập " + message + " từ 8 đến 20 kí tự");
        $("#register_" + id + "_true").addClass("register_validate");
        return false;
    }

}
function checkEmpty() {
    var flag = true;
    $(".register_input").each(function (index, object) {
        var item = $(object);
        if ($.trim(item.val().length) == 0) {
            $(".register_error_field").eq(index).text("Bạn không được để trống trường nào");
            flag = false;
        } else {
            $(".register_error_field").eq(index).text("");
        }
    });
    return flag;
}
function validateFullname() {
    // var name = $("#input_name");
    // if (checkLengh("name", "Họ tên")) {
    //     if (checkWordSpecil(name.val())) {
    //         $("#register_name_error").text("");
    //         $("#register_name_true").removeClass("register_validate");
    //         return true;
    //     } else {
    //         $("#register_name_error").text("Họ tên không được có kí tự đặc biệt");
    //         $("#register_name_true").addClass("register_validate");
    //         return false;
    //     }
    // }
    // else return false;
}
function validateMail() {
    var email = $("#input_email").val();
    // if(checkLengh("email","email")){
    if ($.trim(email).length > 0) {
        if (!validateEmail(email)) {

            $("#register_email_error").text("Email nhập sai");
            $("#register_email_true").addClass("register_validate");
            return false;
        } else {
            $("#register_email_error").text("");
            $("#register_email_true").removeClass("register_validate");
            return true;
        }
    }
    else return false;
}
function validateRetypePassword() {
    var password = $("#input_password");
    var password2 = $("#input_password_2");
    if (($.trim(password.val()) != ($.trim(password2.val())))) {
        $("#register_password_error2").text("Nhập lại password chưa đúng");
        $("#register_password_true2").addClass("register_validate");
        return false;
    }
    else {
        $("#register_password_error2").text("");
        $("#register_password_true2").removeClass("register_validate");
        return true;
    }
}
function validateUsername() {
    var name = $("#input_username");
    if (checkLengh("username", "Tên đăng nhập")) {
        if (checkWordSpecil(name.val())) {
            $("#register_username_error").text("");
            $("#register_username_true").removeClass("register_validate");
            return true;
        } else {
            $("#register_username_error").text("Tên đăng nhập không được có kí tự đặc biệt");
            $("#register_username_true").addClass("register_validate");
            return false;
        }
    }
    else return false;
}
function validatePassword() {
    var name = $("#input_password");
    if (checkLengh("password", "Mật khẩu")) {
        if (checkWordSpecil(name.val())) {
            $("#register_password_error").text("");
            $("#register_password_true").removeClass("register_validate");
            return true;
        } else {
            $("#register_password_error").text("Mật khẩu không được có kí tự đặc biệt");
            $("#register_password_true").addClass("register_validate");
            return false;
        }
    }
    else return false;
}
function validateAddress() {
    // var name = $("#input_address");
    // if (checkLengh("address", "Địa chỉ")) {
    //     if (checkWordSpecil(name.val())) {
    //         $("#register_address_error").text("");
    //         $("#register_address_true").removeClass("register_validate");
    //         return true;
    //     } else {
    //         $("#register_password_error").text("Địa chỉ không được có kí tự đặc biệt");
    //         $("#register_password_true").addClass("register_validate");
    //         return false;
    //     }
    // }
    // else return false;
}

function validatePhoneNumber() {
    var flagphone = true;
    var phone = $("#input_phone_number");
    var filter = new Array();
     filter[0] = /^09[0-8]{1}[0-9]{7}$/;
     filter[1]= /^016[3-9]{1}[0-9]{7}$/;
     filter[3] = /^012[0-9]{1}[0-9]{6}$/;
     filter[4] = /^099[3-6]{1}[0-9]{6}$/;
     filter[2] =/^01(88|99)[0-9]{6}$/;
    for(var i=0;i<=4;i++){
        if (filter[i].test($.trim(phone.val()))) {
            $("#register_phone_error").text("");
            $("#register_phone_true").removeClass("register_validate");
            return true;

        }
    }
    {
        $("#register_phone_error").text("Số điện thoại nhập sai");
        $("#register_phone_true").addClass("register_validate");
        return false;
    }

}
function addDay(index) {
    var str = "<option value='" +
        index +
        "'>" +
        index +
        "</option>";
    return str;
}
function loadDay() {
    for (var i = 31; i >= 2; i--)
        $("#day1").after(addDay(i))
    for (var i = 12; i >= 2; i--)
        $("#month1").after(addDay(i))
    for (var i = 2017; i >= 1961; i--)
        $("#year1").after(addDay(i))
}
function validateBirthday(day, month, year) {

    var d = new Date(year, month - 1, day);
    if (d && (d.getMonth()) + 1 == month) {
        $("#register_birthday_error").text("");
        return true;
    } else {
        $("#register_birthday_error").text("Bạn chọn sai ngày");
        return false;
    }

}
function getBirthday() {
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();
    console.log(day);
    console.log(month);
    console.log(year);
    if (validateBirthday(day, month, year)) {

        if (parseInt(day) < 10)
            day = "0" + day;
        if (parseInt(month) < 10)
            month = "0" + month;
        console.log(day + "/" + month + "/" + year);
        return day + "/" + month + "/" + year;
    } else
        return "";
}
function checkEmptyAvatar() {
    if ($("#bt_choose_ava").val() == "") {
        $("#register_avatar_error").text("Bạn chưa chọn avatar");
        return false;
    }
    else {
        $("#register_avatar_error").text("");
        return true;
    }

}
function checkImage() {
    var width = $('#hidden_avatar').prop('naturalWidth');
    var height = $('#hidden_avatar').prop('naturalHeight');
}
