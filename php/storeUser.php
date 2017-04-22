<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/19/2017
 * Time: 1:10 PM
 */
require_once("../home/config.php");
include("../function/function.php");
//$operation = new Operation();
$username = getValue(USERNAME, STRING, "", POST);
$fullname = getValue(FULLNAME, STRING, "", POST);
$email = getValue(EMAIL, STRING, "", POST);
$birthday = getValue(BIRTHDAY, STRING, "", POST);
$gender = getValue(GENDER, INT, 0, POST);
$address = getValue(ADDRESS, STRING, "", POST);
$phone_number = getValue(PHONE_NUMBER, STRING, "", POST);
$description = getValue(DESCRIPTION, STRING, "", POST);
$password = (getValue(PASSWORD, STRING, "", POST));
if (validateBirthday($birthday) && validatePhone($phone_number)
    && validateEmail($email) && validateGender($gender)
    && validateValues($username) && validateValues($password)) {
    $time_register = new DateTime("now",new DateTimeZone("Asia/Ho_Chi_Minh"));
    $timestamp = $time_register->getTimestamp();
    $time_register->format("H:i:s, d/m/Y");
    $avatar = uploadAvatar($timestamp);
    if ($avatar) {
        resize_image("../uploads/" . $avatar, 100, 100);
        resize_image("../uploads/" . $avatar, 150, 150);
        if (!isExistUsername($username, $email)) {
            if (storeUser($fullname, $username, $email,
                $birthday, $gender, $address, md5($password), $phone_number, $description, $avatar,$time_register->format("H:i:s, d/m/Y")))
                echo "add success";
            else echo "add failure";
        } else
            echo "username or email exist";


    } else
        echo "upload avatar failure";
}else
    echo "Dữ liệu lỗi";