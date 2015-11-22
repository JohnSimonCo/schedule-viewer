<?php
$weeks = null;
$week_expire_time = 60 * 60 * 24 * 7; //One week
if(file_exists("weeks.txt")) {
    $contents = json_decode(file_get_contents("weeks.txt"), true);
    $timestamp = $contents["timestamp"];

    if(time() - $timestamp < $week_expire_time) {
        $weeks = $contents["weeks"];
    }
}

if(is_null($weeks)) {
    include_once('./httpful.phar');

    $response = \Httpful\Request::get("http://jrp.se:8080/s/weeks")
        ->send();
    $weeks = $response->raw_body;
    $timestamp = time();
    $contents = [
        "timestamp" => $timestamp,
        "weeks" => $weeks
    ];
    file_put_contents("weeks.txt", json_encode($contents));
}
return $weeks;