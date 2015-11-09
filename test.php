<?php

$week = $_GET["week"];

include('./httpful.phar');

/*
$response = \Httpful\Request::get('http://jrp.se:8080/schedule/46')
    ->expectsJson()
    ->send();
*/

$response = file_get_contents("data.json");

$response = json_decode($response);

//print_r($response);

echo $response->data;

/*
foreach($response->data as $class) {
    echo $class;
}
*/
