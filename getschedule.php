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
        echo "Class not found";
        die(500);
    }
}

include('./httpful.phar');

$response = \Httpful\Request::get("http://jrp.se:8080/schedule/$week")
    ->expectsJson()
    ->send();


//$response = file_get_contents("data.json");

$schedules = json_decode($response, true);

mkdir("schedules/$week", 0777, true);
foreach($schedules as $schedule) {
    $name = $schedule["className"];
    $json = json_encode($schedule);
    $file = "schedules/$week/$name.json";
    file_put_contents($file, $json);

    if($name == $className) {
        echo $json;
    }
}