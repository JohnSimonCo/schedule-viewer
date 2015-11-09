<?php
$schedules = glob('schedules/*.json');
foreach($schedules as $fileName) {
    preg_match("/([\\w-]+)\\.json$/", $fileName, $matches);
    echo $matches[1]."<br>";
}
