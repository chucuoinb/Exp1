<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/19/2017
 * Time: 1:10 PM
 */
require_once("const.php");
require_once("Operation.php");
$operation = new Operation();
$avatar = $operation->uploadAvatar();
if ($avatar) {
    $operation->resize_image("../uploads/".$avatar,100,100);
    $operation->resize_image("../uploads/".$avatar,150,150);
    $username   = $operation->getValue(USERNAME, STRING, "", POST);
    $fullname   = $operation->getValue(FULLNAME, STRING, "", POST);
    $email      = $operation->getValue(EMAIL, STRING, "", POST);
    $birthday   = $operation->getValue(BIRTHDAY, STRING, "", POST);
    $gender     = $operation->getValue(GENDER, INT, 0, POST);
    $address    = $operation->getValue(ADDRESS, STRING, "", POST);
    $phone_number = $operation->getValue(PHONE_NUMBER, STRING, "", POST);
    $description = $operation->getValue(DESCRIPTION, STRING, "", POST);
    $password = md5($operation->getValue(PASSWORD, STRING, "", POST));
//    $list[USERNAME] = $username;
//    $list[FULLNAME] = $fullname;
//    $list[EMAIL] = $email;
//    $list[BIRTHDAY] = $birthday;
//    $list[GENDER] = $gender;
//    $list[ADDRESS] = $address;
//    $list[PASSWORD] = $password;
//    $list[PHONE_NUMBER] = $phone_number;
//    $list[DESCRIPTION] = $description;
    if (!$operation->isExistUsername($username, $email)) {
        if($operation->storeUser($fullname, $username, $email,
            $birthday, $gender, $address, $password, $phone_number, $description, $avatar))
            echo "add success";
        else echo "add failure";
    }else
        echo "username or email exist";
}else
    echo "upload avatar failure";
