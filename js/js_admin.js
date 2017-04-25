/**
 * Created by Nam on 4/24/2017.
 */
var positionMenuAdmin = 0;
$(document).ready(function () {
    $(".menu_admin").click(function () {
        var index = $(".menu_admin").index(this);
        if(index != positionMenuAdmin){
            $(".menu_admin").eq(positionMenuAdmin).removeClass("active_admin");
            $(".menu_admin").eq(index).addClass("active_admin");
            positionMenuAdmin = index;
        }
    });
});