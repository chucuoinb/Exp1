<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/22/2017
 * Time: 9:08 AM
 */
session_start();
require_once("../function/function.php");
require_once("../home/config.php");
$login = getValue("use_login", STRING, "", POST);
$password = getValue(PASSWORD, STRING, "", POST);
if (validateValues($password) && (validateEmail($login) || validateValues($login))) {
    $res = login($login, md5($password));
    if ($res) {
        $_SESSION[ID] = $res[ID];
        if ($_POST["use_isSave"] == 1) {
            setcookie(FULLNAME, $res[FULLNAME], time() + 3600, "/home");
            setcookie("save", 1, time() + 3600,"/home");

        }
        else
            $_SESSION[FULLNAME] = $res[FULLNAME];
//        echo getValue(FULLNAME,STRING,"1",COOKIE);
        echo ResponseMessage(CODE_OK, "success", $_POST["use_isSave"]);
    } else
        echo ResponseMessage(CODE_FAIL, "failure", $login);
} else
    ResponseMessage(CODE_ERROR, "error", $login);
?>