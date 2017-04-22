<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/22/2017
 * Time: 10:43 PM
 */
session_start();
require_once ("../home/config.php");
echo $_SESSION[FULLNAME];
if(isset($_SESSION[FULLNAME]))
    unset($_SESSION[FULLNAME]);
if (isset($_SESSION[ID]))
    unset($_SESSION[ID]);
//echo 1;