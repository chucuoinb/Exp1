<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/19/2017
 * Time: 1:10 PM
 */
require_once("const.php");
require_once ("Operation.php");
$list = array();
$operation = new Operation();
//$operation->ResponseMessage("ok","success",$operation->getInfoUsername());
$username = $operation->getValue(USERNAME,STRING,"");
$fullname = $operation->getValue(FULLNAME,STRING,"");
$email = $operation->getValue(EMAIL,STRING,"");
$birthday = $operation->getValue(BIRTHDAY,STRING,"");
$gender = $operation->getValue(GENDER,INT,0);
$address = $operation->getValue(ADDRESS,STRING,"");
$phone_number = $operation->getValue(PHONE_NUMBER,INT,0);
$description = $operation->getValue(DESCRIPTION,STRING,"");
$password = $operation->getValue(PASSWORD,STRING,"");
array_push($list,$username);
array_push($list,$fullname);
array_push($list,$email);
array_push($list,$birthday);
array_push($list,$gender);
array_push($list,$address);
array_push($list,$password);
array_push($list,$phone_number);
array_push($list,$description);
echo $birthday;
$operation->ResponseMessage("ok","sucess",$list);