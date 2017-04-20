<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/20/2017
 * Time: 4:25 PM
 */
function connect()
{
    $db = loader::getInstance();
    $mysqli = $db->getConnection();
    if (!$mysqli) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        return $mysqli;
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

function uploadAvatar()
{
    $target_dir = "../uploads/";
    $uploadOk = 1;
    $imageFileType = pathinfo($_FILES["use_avatar"]["name"], PATHINFO_EXTENSION);
    $name = $this->createRandomString(3) . ((new DateTime())->getTimestamp()).".".$imageFileType;
    $target_file = $target_dir . basename($name);

    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    if ($_FILES["use_avatar"]["size"] > 1024*1024) {
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
    $mysqli = $this->connect();
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
    $mysqli = $this->connect();
    $res = $mysqli->query($sql);
//        echo json_encode($res);
    if (mysqli_num_rows($res) > 0) {
        return true;
    } else
        return false;
}

function storeUser($fullname, $username, $email, $birthday, $gender, $address, $password, $phone_number, $description,$avatar)
{

    if (!$this->isExistUsername($username, $email)) {
        $sql = "INSERT INTO users
                    (use_fullname,use_username,use_email,use_birthday,
                    use_gender,use_address,use_password,use_phone_number,use_description,use_avatar)
                    VALUES (?,?,?,?,?,?,?,?,?,?)";
//                    VALUES ('".$fullname." ',' ".$username."',
//                            '".$email."','".$birthday."',
//                            '".$gender."','".$address."',
//                            '".$password."','".$phone_number."','".$description."','".$avatar."')";
        $mysqli = $this->connect();
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("ssssisssss",$fullname, $username, $email, $birthday, $gender, $address, $password, $phone_number, $description,$avatar);
        $res = $stmt ->execute();
        $stmt->close();
        if ($res) {
            $sql = "SELECT * FROM users
                        WHERE use_username = '" . $username . "'";
            $res = $mysqli->query($sql);
            if (mysqli_num_rows($res) > 0)
                return true;
            else return false;
        } else
            return false;
    } else
        return false;

}

function resize_image($filename, $new_width, $new_height) {
    $image_info = getimagesize($filename);
    $type = $image_info[2];
    if ($type == IMAGETYPE_JPEG) {

        $image = imagecreatefromjpeg($filename);
    } elseif ($type == IMAGETYPE_GIF) {

        $image = imagecreatefromgif($filename);
    } elseif ($type == IMAGETYPE_PNG) {

        $image = imagecreatefrompng($filename);
    }
    $new_image = imagecreatetruecolor($new_width, $new_height);
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $new_width, $new_height, imagesx($image), imagesy($image));
//        $this->image = $new_image;
    $new_name = substr_replace($filename,"/".$new_width."x".$new_height."/",10,0);
    if ($type == IMAGETYPE_JPEG) {
//            $new_name = "";
        imagejpeg($new_image, $new_name, 100);
    } elseif ($type == IMAGETYPE_GIF) {
        imagegif($new_image, $new_name);
    } elseif ($type == IMAGETYPE_PNG) {
        imagepng($new_image, $new_name);
    }

    chmod($new_name, 100);
}