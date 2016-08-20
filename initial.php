<?php
date_default_timezone_set('Europe/Stockholm');

$week = getCurrentWeek();
$weeks = $metadata["weeks"];
if(!in_array($week, $weeks)) {
    $week = $weeks[count($weeks) - 1];
}

$classNames = $metadata["classNames"];
$className = isset($_COOKIE["className"]) ? $_COOKIE["className"] : "14TE";
if(!in_array($className, $classNames)) {
    $className = $classNames[0];
}

$view = isset($_COOKIE["view"]) ? $_COOKIE["view"] : ($isMobile ? "day" : "week");

$file = "schedules/$week/$className.json";
$json = file_get_contents($file);

$schedule = json_decode($json, true);

return [
    "week" => $week,
    "className" => $className,
    "view" => $view,
    "schedule" => $schedule
];

function getCurrentWeek() {
    $date = new DateTime("NOW");
    $week = intval($date->format("W"));

    $day = intval($date->format("N"));

    if($day > 5) {
        $week++;
    }

    return $week;
}
