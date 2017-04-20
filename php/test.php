<?php
/**
 * Created by PhpStorm.
 * User: Nam
 * Date: 4/20/2017
 * Time: 2:16 PM
 */
require_once ("Operation.php");
$operation = new Operation();
$res = $operation->resize_image("../uploads/am51492677114.png",100,100);
echo $res;