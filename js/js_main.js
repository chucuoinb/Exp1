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
var numberDisplayItemBanner = 1;
var idItemBanner = "#img";
var idItemProduct = "#list_item_right_img";
var click = false;
var timeOutMove;
var positionLagre;
var positionVote = -1;
var srcItemCart;
var numberOfItemCart;
var listItem = new Array();
var price;
var checkExistItem = false;
$(function () {
    // $("input").focusin(function () {
    //     $(this).val("");
    //     $(this).css("color", "#444444")
    // });
    $("#review_text").focusin(function () {
        this.css("border","0px solid #2eabd9")
    })
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
        $("#item_large >img").attr("src", $(idItemProduct + $(".list_item_right").index(this)).attr("src"));
        $(".list_item_right").removeClass("display");
        $(".list_item_right").eq($(".list_item_right").index(this)).addClass("display");
    });

    //vote
    $(".bt_vote").click(function () {
        var index = $(".bt_vote").index(this);
        if (index == positionVote) {
            deleteVote();
            positionVote = -1;
        } else {

            positionVote = index;
            changeVote(index);
        }
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
        srcItemCart = $("#img_item_large").attr("src");
        numberOfItemCart = parseInt($("#number_of_item").val());
        if (listItem.length > 0) {
            for(var i =0;i<listItem.length;i++){
                if(listItem[i].getSrc() == srcItemCart){
                    listItem[i].addValues(numberOfItemCart);
                    checkExistItem = true;
                }
            }
            if (checkExistItem == false) {
                var item = new Item();
                item.setInfo(srcItemCart,344,numberOfItemCart)
                listItem.push(item);

            }
            checkExistItem =false;
        } else {
            var item = new Item();
            item.setInfo(srcItemCart,355.00,numberOfItemCart);
            listItem.push(item);

        }
    });
    
    //delete
    $(document).on("click",".cancel",function () {
        var index = $(".cancel").index(this);
        $(".cart").eq(index).remove();
        alert($(".igItem >a>img").eq(index).attr("src"));
    })
    $("#menu_card").hover(function () {

        loadCart();
        $("#sub_menu1").css("display","block");
    },function () {
        $("#sub_menu1").css("display","none");
        $(".cart").remove();
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
function addItem(src, price,value) {
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
        "<a href='#12'><p>Caldrea Linen and Room Spray</p></a>" +
        "<a href='#12'><p>" +
        value +
        "x " +
        price +
        "</p></a>" +
        "</div>" +
        "<div class='cancel'>" +
        "<p title='delete' class='bt_delete_item'>X</p>" +
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
function getCookie(key) {
    $.cookie
}
function loadCart() {
    for(var i =0; i<listItem.length;i++){
        $("#add_item").after(addItem(listItem[i].getSrc(),listItem[i].getPrices(), listItem[i].getValues()));
    }
}