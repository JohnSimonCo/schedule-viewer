<?php

include "cors.php";

$week = $_GET["week"];
$className = $_GET["className"];

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