<?php

$weeks = include("weeks.php");

?>

<!DOCTYPE html>
<html>
<head>
    <title>Värmdö Gymnasium Schema</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta http-equiv="expires" content="Sun, 01 Jan 2014 00:00:00 GMT"/>
    <meta http-equiv="pragma" content="no-cache" />

    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>
    <link href="styles/style.css" rel="stylesheet" type="text/css">

    <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/favicons/manifest.json">
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#11171a">

    <script>
        var weeks = JSON.parse('<?php echo $weeks ?>');
    </script>
</head>
<body>
<header class="header">
    <div class="panel">
        <div id="className"></div>
        <select id="classSelect" onchange="changeClass(this.options[this.selectedIndex].value)">
            <?php
            $files = glob('schedules/*.json');
            $schedules = [];
            foreach($files as $fileName) {
                preg_match("/([\\w-]+)\\.json$/", $fileName, $matches);
                array_push($schedules, $matches[1]);
            }

            foreach($schedules as $schedule) { ?>
                <option value="<?php echo $schedule ?>"><?php echo $schedule ?></option>
            <?php } ?>
        </select>

        <div id="parseErrorMessage"></div>
        <div id="parseErrorMessageSmall"></div>

        <div id="changeView" onclick="changeView()">
            <svg id="viewWeek" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#fff" d="M16,5V18H21V5M4,18H9V5H4M10,18H15V5H10V18Z" />
            </svg>

            <svg id="viewDay" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#fff" d="M20,3H3A1,1 0 0,0 2,4V10A1,1 0 0,0 3,11H20A1,1 0 0,0 21,10V4A1,1 0 0,0 20,3M20,13H3A1,1 0 0,0 2,14V20A1,1 0 0,0 3,21H20A1,1 0 0,0 21,20V14A1,1 0 0,0 20,13Z" />
            </svg>
        </div>

        <div class="weekSelect">
            <div onclick="weekBack()" class="weekSelectArrow"><</div>
            <div id="weekSelectNow"></div>
            <div onclick="weekForward()" class="weekSelectArrow">></div>
        </div>
    </div>

    <div id="dayHeader"></div>
</header>

<div class="schedule-container">
    <div id="dayChangeLeft" class="day-changer" onclick="changeDay(0)">
        <span id="dayChangeLeftText" class="day-changer-span"><</span>
    </div>
    <div id="schedule"></div>
    <div id="dayChangeRight" class="day-changer" onclick="changeDay(1)">
        <span id="dayChangeRightText" class="day-changer-span">></span>
    </div>
</div>

<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript" src="js/view.js"></script>
<script type="text/javascript" src="js/script.js"></script>

</body>
</html>