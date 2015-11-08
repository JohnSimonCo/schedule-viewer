<?php

include_once "cors.php";

$className = $_GET["className"];

$json = file_get_contents("scheman/".$className.".json");

echo $json;