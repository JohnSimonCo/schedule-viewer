<?php

include "cors.php";

$className = $_GET["className"];

$json = file_get_contents("schedules/".$className.".json");

echo $json;