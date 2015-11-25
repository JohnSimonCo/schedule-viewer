<?php

$scheduleJson = $_POST["schedules"];

$schedules = json_decode($scheduleJson, true);

echo "week: ".$schedules[0]["week"];

foreach($schedules as $item) {
    $week = $item["week"];
    mkdir("schedules/$week", 0777, true);
    foreach($item["schedules"] as $classSchedule) {
        $className = $classSchedule["className"];
        $json = json_encode($classSchedule);

        echo "made file: "."schedules_test/$week/$className.json";
        $file = "schedules/$week/$className.json";
        file_put_contents($file, $json);
    }
}

echo "got it";