<!DOCTYPE html>
<html>
<head>
    <title>Värmdö Gymnasium Schema</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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

        <div class="weekSelect">
            <div onclick="weekBack()" class="weekSelectArrow"><</div>
            <div id="weekSelectNow"></div>
            <div onclick="weekForward()" class="weekSelectArrow">></div>
        </div>
    </div>

    <div id="dayHeader"></div>
</header>

<div id="schedule"></div>

<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/script.js"></script>

</body>
</html>