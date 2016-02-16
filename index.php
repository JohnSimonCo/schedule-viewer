<?php

$metadata = include("metadata.php");
$initial = include("initial.php");

include_once("includer.php");

?>
<!DOCTYPE html>
<html>
<head>
    <title>Värmdö Gymnasium Schema</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">

    <meta http-equiv="expires" content="Sun, 01 Jan 2014 00:00:00 GMT"/>
    <meta http-equiv="pragma" content="no-cache" />

    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>
    <link href="styles/style.css" rel="stylesheet" type="text/css">
    <?php
    include_style("styles/style.css");
    ?>
    <!--<link href="styles/style.css" rel="stylesheet" type="text/css">-->

    <link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="favicons/manifest.json">
    <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#11171a">

    <script>
        var weeks = JSON.parse('<?php echo json_encode($metadata["weeks"]) ?>');
        var classNames = JSON.parse('<?php echo json_encode($metadata["classNames"]) ?>');
        var initial = JSON.parse('<?php echo json_encode($initial) ?>');
    </script>
</head>
<body>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-58689643-2', 'auto');
    ga('send', 'pageview');

</script>

<div id="normal-layout">

    <header class="header">
        <div class="panel">
            <div id="className"><?php echo $initial["className"] ?></div>
            <select id="classSelect" onchange="changeClass(this.options[this.selectedIndex].value)">
                <?php
                foreach($metadata["classNames"] as $className) { ?>
                    <option value="<?php echo $className ?>" <?php if($className == $initial["className"]) echo 'selected="true"' ?>>
                        <?php echo $className ?>
                    </option>
                <?php } ?>
            </select>

            <div id="parseErrorMessage"></div>
            <div id="parseErrorMessageSmall"></div>

            <a id="aboutButton" href="about.php">
                <svg viewBox="0 0 24 24">
                    <path fill="#fff" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                </svg>
            </a>

            <div id="changeView" onclick="changeView()">
                <svg id="viewWeek" style="width:24px;height:24px" viewBox="0 0 24 24" <?php if($initial["view"] == "week") echo 'class="hidden"' ?>>
                    <path fill="#fff" d="M16,5V18H21V5M4,18H9V5H4M10,18H15V5H10V18Z" />
                </svg>

                <svg id="viewDay" style="width:24px;height:24px" viewBox="0 0 24 24" <?php if($initial["view"] == "day") echo 'class="hidden"' ?>>
                    <path fill="#fff" d="M20,3H3A1,1 0 0,0 2,4V10A1,1 0 0,0 3,11H20A1,1 0 0,0 21,10V4A1,1 0 0,0 20,3M20,13H3A1,1 0 0,0 2,14V20A1,1 0 0,0 3,21H20A1,1 0 0,0 21,20V14A1,1 0 0,0 20,13Z" />
                </svg>
            </div>

            <div class="weekSelect">
                <div onclick="weekBack()" class="weekSelectArrow">
                    <svg class="arrow" fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                        <path d="M0-.5h24v24H0z" fill="none"/>
                    </svg>
                </div>
                <div id="weekSelectNow"><?php echo $initial["week"] ?></div>
                <div onclick="weekForward()" class="weekSelectArrow">
                    <svg class="arrow" fill="#FFFFFF"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                        <path d="M0-.25h24v24H0z" fill="none"/>
                    </svg>
                </div>
            </div>
        </div>

        <div id="dayHeader"></div>
    </header>

    <div class="schedule-container">
        <div id="dayChangeLeft" class="day-changer" onclick="changeDay(0)">
            <span class="day-changer-span">
                <svg id="dayChangeLeftIcon" class="schedule-day-arrow" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                    <path d="M0-.5h24v24H0z" fill="none"/>
                </svg>
            </span>
        </div>
        <div id="schedule">

        </div>
        <div id="dayChangeRight" class="day-changer" onclick="changeDay(1)">
            <span class="day-changer-span">
                <svg id="dayChangeRightIcon" class="schedule-day-arrow" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    <path d="M0-.25h24v24H0z" fill="none"/>
                </svg>
            </span>
        </div>
    </div>
</div>
<div id="overlay-layout">
    <div id="modalMasterHolder">
        <div class="full-center" "></div>
        <div onclick="setModalVisibility(false)" id="modalContainer"></div>
    </div>
</div>

<?php

include_script("js/lib.js");
include_script("js/util.js");
include_script("js/schedule.js");
include_script("js/view.js");
include_script("js/script.js");

?>
<!--
<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript" src="js/schedule.js"></script>
<script type="text/javascript" src="js/view.js"></script>
<script type="text/javascript" src="js/script.js"></script>
-->
</body>
</html>