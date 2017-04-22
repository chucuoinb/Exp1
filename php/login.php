<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/22/2017
 * Time: 9:08 AM
 */
session_start();
require_once ("../function/function.php");
require_once ("../home/config.php");
$email = getValue(EMAIL,STRING,"",POST);
$password = getValue(PASSWORD,STRING,"",POST);
if(validateValues($password) && validateEmail($email)){
    $res = login($email,md5($password));
    if ($res){
        $_SESSION[ID] = $res[ID];
        $_SESSION[FULLNAME] = $res[FULLNAME];
        echo ResponseMessage(CODE_OK,"success",$res);
    }
    else
        echo ResponseMessage(CODE_FAIL,"failure",$email);
}
else
    ResponseMessage(CODE_ERROR,"error",$email);
?>