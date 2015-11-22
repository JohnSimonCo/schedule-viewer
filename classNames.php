<?php
$files = glob('schedules/*.json');
$classNames = [];
foreach($files as $fileName) {
    preg_match("/([\\w-]+)\\.json$/", $fileName, $matches);
    array_push($classNames, $matches[1]);
}

var_dump($classNames);