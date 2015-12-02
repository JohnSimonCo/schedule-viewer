<?php

$week = getCurrentWeek();
$weeks = $metadata["weeks"];
if(!in_array($week, $weeks)) {
    $week = $weeks[0];
}

$classNames = $metadata["classNames"];
$className = isset($_COOKIE["className"]) ? $_COOKIE["className"] : "13TE";
if(!in_array($className, $classNames)) {
    $className = $classNames[0];
}

$file = "schedules/$week/$className.json";
$json = file_get_contents($file);

$schedule = json_decode($json, true);

return [
    "week" => $week,
    "className" => $className,
    "schedule" => $schedule
];


function getCurrentWeek() {
    $date = new DateTime("NOW");
    $week = $date->format("W");

    $day = $date->format("N");

    if($day > 5) {
        $week++;
    }

    return $week;
}