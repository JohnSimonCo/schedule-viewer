<?php

$json = file_get_contents("metadata.json");

return json_decode($json, true);