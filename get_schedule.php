<?php

include "cors.php";

$week = $_GET["week"];
$className = $_GET["className"];

$week_regex = "/^\\d{1,2}$/";
$className_regex = "/^[\\w\\d\\s]{2,20}$/";
if(!preg_match($week_regex, $week) || !preg_match($className_regex, $className)) {
    echo "Invalid week or class name";
    http_response_code(400);
    die(400);
}

if(file_exists("schedules/$week")) {
    $file = "schedules/$week/$className.json";
    if(file_exists($file)) {
        echo file_get_contents($file);
        exit();
    } else {
        echo "Schedule not found";
        http_response_code(400);
        die(400);
    }
}