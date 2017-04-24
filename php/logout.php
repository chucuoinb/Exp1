<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/22/2017
 * Time: 10:43 PM
 */
session_start();
require_once ("../home/config.php");
setcookie(FULLNAME, "", time()-3600,"/home");
setcookie("use_save", "", time()-3600,"/home");
if (isset($_SESSION[ID]))
    unset($_SESSION[ID]);
if (isset($_SESSION[FULLNAME]))
    unset($_SESSION[FULLNAME]);
//echo 1;
