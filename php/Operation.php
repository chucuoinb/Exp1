<?php

/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/19/2017
 * Time: 3:04 PM
 */
require_once("const.php");
require_once("config.php");
require_once("loader.php");

class Operation
{
    private $conn;

    function __construct()
    {
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
        $this->conn->query("SET NAMES utf8");
        $this->conn->query("SET CHARACTER SET utf8");
        $this->conn->set_charset('utf8');
        $this->conn->set_charset('utf-8');
    }

    function getConn()
    {
        return $this->conn;
    }

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
        $name = $this->createRandomString(3);
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename();
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

// Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
// Check file size
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
// Allow certain file formats
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif"
        ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
// Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
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
        }else return false;
    }

    function ResponseMessage($code, $message, $data)
    {
        $response = array();
        $response[CODE] = $code;
        $response[MESSAGE] = $message;
        $response[DATA] = $data;
        echo json_encode($response);
    }

    function getValue($key,$type,$default){
        if(isset($_POST[$key])){
            $value = $_POST[$key];
            switch ($type){
                case STRING:
                    if(is_string($value))
                        return $value;
                    else
                        return $default;
                case INT:
                    if(is_int($value))
                        return $value;
                    else
                        return  $default;
            }
        }else
            return $default;
    }


}