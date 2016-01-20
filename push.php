<?php

$password = $_POST["password"];
$correct_password = include("password.php");
if($password != $correct_password) {
    http_response_code(401);
    die(401);
}

echo "password worked";

$scheduleJson = $_POST["schedules"];

$schedules = json_decode($scheduleJson, true);

$weeks = [];

foreach($schedules as $item) {
    $week = $item["week"];
    array_push($weeks, $week);

    mkdir("schedules/$week", 0777, true);
    foreach($item["schedules"] as $classSchedule) {
        $className = $classSchedule["className"];
        $file = "schedules/$week/$className.json";
        $json = json_encode($classSchedule);

        echo "made file: "."schedules/$week/$className.json";
        file_put_contents($file, $json);
    }
}

$classNames = [];

foreach($schedules[0]["schedules"] as $classSchedule) {
    $className = $classSchedule["className"];
    array_push($classNames, $className);
}

$metadata = [
    "weeks" => $weeks,
    "classNames" => $classNames
];

file_put_contents("metadata.json", json_encode($metadata));

echo "got it";