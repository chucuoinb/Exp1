<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/20/2017
 * Time: 4:25 PM
 */
require_once("../home/config.php");
require_once("../class/db_loader.php");
//function connect()
//{
//    $db = DbLoader::getInstance();
//    $mysqli = $db->getConnection();
//    if (!$mysqli) {
//        die("Connection failed: " . mysqli_connect_error());
////        return fals
//    } else {
//        return $mysqli;
//    }
//}

function fnQuery($sql)
{
    $db = DbLoader::getInstance();
    if (!$db->getConnection()) {
        die("Connection failed: " . mysqli_connect_error());
        return false;
    } else {
        $res = $db->query($sql);
        return $res;
    }
}

function createRandomString($length)
{
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));
    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }
    return $key;
}

function uploadAvatar($time)
{
    $target_dir = "../uploads/";
    $uploadOk = 1;
    $imageFileType = pathinfo($_FILES["use_avatar"]["name"], PATHINFO_EXTENSION);
    $name = createRandomString(3) . $time . "." . $imageFileType;
    $target_file = $target_dir . basename($name);

    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    if ($_FILES["use_avatar"]["size"] > 1024 * 1024) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        return false;
    } else {
        if (move_uploaded_file($_FILES["use_avatar"]["tmp_name"], $target_file)) {
//                echo "The file " . basename($name) . " has been uploaded.";
            return $name;
        } else {

//                echo "Sorry, there was an error uploading your file.";
            return false;

        }
    }
}

function getInfoUsername()
{
    $data = array();
    $sql = "SELECT * FROM users
                ";
    $mysqli = connect();
    $res = $mysqli->query($sql);
    if ($res) {
        $data = mysqli_fetch_assoc($res);
//            $data[USERNAME] = $result[USERNAME];
//            $data[GENDER]=$result[GENDER];
        $mysqli->close();
        return $data;
    } else return false;
}

function ResponseMessage($code, $message, $data)
{
    $response = array();
    $response[CODE] = $code;
    $response[MESSAGE] = $message;
    $response[DATA] = $data;
    echo json_encode($response);
}

function getValue($field, $type, $default, $method)
{
    $values = $default;
    $data = $default;
    switch ($method) {
        case POST:
            $data = isset($_POST[$field]) ? $_POST[$field] : $default;
            break;
        case GET:
            $data = isset($_GET[$field]) ? $_GET[$field] : $default;
            break;
        case COOKIE:
            $data = isset($_COOKIE[$field]) ? $_COOKIE[$field] : $default;
            break;
        case SESSION:
            $data = isset($_SESSION[$field]) ? $_SESSION[$field] : $default;
            break;
    }
    switch ($type) {
        case STRING:
            if (is_string($data)) {

//                $values = preg_replace('/\s+/', '', $data);
                $values = $data;
            }
            break;
        case INT:
            if (is_int($data))
                $values = $data;
            break;
        case _ARRAY:
            if (is_array($data)) {
                $values = array();
                $values = $data;
            }
            break;
    }
    return $values;
}

function getData($type, $values)
{

    switch ($type) {
        case STRING:
            if (is_string($values))
                $data = $values;
            break;
        case INT:
            if (is_int($values))
                $data = $values;
            break;
        case _ARRAY:
            if (is_array($values)) {
                $values = array();
                $data = $values;
            }
            break;
    }
}

function isExistUsername($username, $email)
{
    $sql = "SELECT * FROM users
                WHERE use_username = '" . $username . "'
                OR use_email = '" . $email . "'";
//        $sql = "INSERT INTO users
//                (use_username,use_email)
//                  VALUES ('$username','$email')";
//    $mysqli = connect();
    $res = fnQuery($sql);
//        echo json_encode($res);
    if (mysqli_num_rows($res) > 0) {
        return true;
    } else
        return false;
}

function storeUser($fullname, $username, $email, $birthday, $gender, $address, $password, $phone_number, $description, $avatar,$time_register)
{

    if (!isExistUsername($username, $email)) {
        $sql = "INSERT INTO users
                    (use_fullname,use_username,use_email,use_birthday,
                    use_gender,use_address,use_password,use_phone_number,use_description,use_avatar,use_time_register,use_active)
                    VALUES ('" . $fullname . " ',' " . $username . "',
                            '" . $email . "','" . $birthday . "',
                            '" . $gender . "','" . $address . "',
                            '" . $password . "','" . $phone_number . "','" . $description . "','" . $avatar . "',
                            '". $time_register ."','1')";
//        $mysqli = connect();
//        $stmt = $mysqli->prepare($sql);
//        $stmt->bind_param("ssssisssss",$fullname, $username, $email, $birthday, $gender, $address, $password, $phone_number, $description,$avatar);
//        $res = $stmt ->execute();
//        $stmt->close();
        $res = fnQuery($sql);
//        $mysqli->close();
        if ($res) {
            if (isExistUsername($username, $email)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

}


function resize_image($filename, $new_width, $new_height)
{
    $image_info = getimagesize($filename);
    $type = $image_info[2];
    $new_image = imagecreatetruecolor($new_width, $new_height);
    if ($type == IMAGETYPE_JPEG) {

        $image = imagecreatefromjpeg($filename);
    } elseif ($type == IMAGETYPE_GIF) {

        $image = imagecreatefromgif($filename);
    } elseif ($type == IMAGETYPE_PNG) {
        $image = imagecreatefrompng($filename);
        $background = imagecolorallocate($new_image, 0, 0, 0);
        // remove the black
        imagecolortransparent($new_image, $background);
        imagealphablending($new_image, false);
        imagesavealpha($new_image, true);
    }
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $new_width, $new_height, imagesx($image), imagesy($image));
    if (!file_exists("../uploads/" . $new_width . "x" . $new_height) && !is_dir("../uploads/" . $new_width . "x" . $new_height)) {
        mkdir("../uploads/" . $new_width . "x" . $new_height);
    }
    $new_name = substr_replace($filename, "/" . $new_width . "x" . $new_height, 10, 0);
    if ($type == IMAGETYPE_JPEG) {
        imagejpeg($new_image, $new_name);
    } elseif ($type == IMAGETYPE_GIF) {
        imagegif($new_image, $new_name);
    } elseif ($type == IMAGETYPE_PNG) {
        imagepng($new_image, $new_name);
    }

}

function transparent_background($filename)
{
    $new_name = "../uploads/123.png";
    $img = imagecreatefrompng($filename); //or whatever loading function you need
    $colors = explode(',', '255,255,255');
    $remove = imagecolorallocate($img, $colors[0], $colors[1], $colors[2]);
    imagecolortransparent($img, $remove);
    imagepng($img, $new_name);
}

function validateLen($validate)
{
    if (strlen($validate) < 8 || strlen($validate) > 20)
        return false;
    return true;
}

function checkWordSpecial($values)
{
    $filter = "/^([0-9a-zA-Z | _])+$/";
    return preg_match($filter, $values);
}

function validateValues($values)
{
    if (validateLen($values)) {
        if (checkWordSpecial($values))
            return true;
        return false;
    }
    return false;
}
function validateEmail($email){
    if( filter_var($email,FILTER_VALIDATE_EMAIL))
        return true;
    else
        return false;
}

function validatePhone($phone){
    $filter = array();
    array_push($filter,"/^09[0-8]{1}[0-9]{7}$/");
    array_push($filter,"/^016[3-9]{1}[0-9]{7}$/");
    array_push($filter,"/^012[0-9]{1}[0-9]{6}$/");
    array_push($filter,"/^099[3-6]{1}[0-9]{6}$/");
    array_push($filter,"/^01(88|99)[0-9]{6}$/");
    foreach ($filter as $temp) {
        if (preg_match($temp,$phone)) {
            return true;

        }
    }
        return false;
}
function validateBirthday($birthday){
    $date = explode("/",$birthday);
    return checkdate($date[1],$date[0],$date[2]);
}
function validateGender($gender){
    if ($gender == GENDER_MALE || $gender == GENDER_FEMALE)
        return true;
    return false;
}
function login($email,$password){
    $sql = "SELECT * FROM users
            WHERE use_email = '".$email."'
            AND use_password = '".$password."'";
    $res = fnQuery($sql);
    if(mysqli_num_rows($res)>0){
        $values = mysqli_fetch_assoc($res);
        $list = array();
        $list[EMAIL] = $values[EMAIL];
        $list[FULLNAME] = $values[FULLNAME];
        $list[ID] = $values[ID];
        return $list;
    }
    return false;
}

