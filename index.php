<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once("is-mobile.php");
// exports $isMobile

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

    <script type="text/json" id="weeks.json">
        <?php echo json_encode($metadata["weeks"]) ?>
    </script>
    <script type="text/json" id="classNames.json">
        <?php echo json_encode($metadata["classNames"]) ?>
    </script>
    <script type="text/json" id="initial.json">
        <?php echo json_encode($initial) ?>
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

<div id="main-layout">

    <div id="normal-layout">

        <div id="class-dropdown-overlay-layout" class="overlay" onclick="toggleClassDropdown()"></div>
        <div id="week-dropdown-overlay-layout" class="overlay" onclick="toggleWeekDropdown()"></div>

        <header class="header">
            <div class="panel">

                <div class="classPanelContainer noselect">

                    <div onclick="toggleClassDropdown()" id="className"><?php echo $initial["className"] ?></div>

                    <div id="classDropdown">

                        <?php
                        foreach($metadata["classNames"] as $className) { ?>
                            <li id="<?php echo $className ?>classDropdown" onclick="toggleClassDropdown(); changeClass('<?php echo $className ?>')" class="dropdownListItem<?php if($className == $initial["className"]) echo ' dropdownClassSelected'?>">
                                <?php echo $className ?>
                            </li>
                        <?php } ?>

                    </div>
                </div>

                <div id="parseErrorMessage"></div>
                <div id="parseErrorMessageSmall"></div>

                <a id="aboutButton" href="about/">
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
                    <div onclick="weekBack()" class="weekSelectArrow noselect">
                        <svg class="arrow" fill="#FFFFFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                            <path d="M0-.5h24v24H0z" fill="none"/>
                        </svg>
                    </div>


                    <div class="weekPanelContainer noselect">

                        <div onclick="toggleWeekDropdown()" id="weekSelectNow"><?php echo $initial["week"] ?></div>

                        <div id="weekDropdown">

                            <?php
                            foreach($metadata["weeks"] as $week) { ?>
                                <li id="<?php echo $week ?>weekDropdown" onclick="toggleWeekDropdown(); changeWeek('<?php echo $week ?>')" class="dropdownListItem<?php if($week == $initial["week"]) echo ' dropdownWeekSelected'?>">
                                    <?php echo $week ?>
                                </li>
                            <?php } ?>

                        </div>
                    </div>


                    <div onclick="weekForward()" class="weekSelectArrow noselect">
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
            <div id="dayChangeLeft" class="day-changer noselect" onclick="changeDay(0)">
            <span class="day-changer-span">
                <svg id="dayChangeLeftIcon" class="schedule-day-arrow" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                    <path d="M0-.5h24v24H0z" fill="none"/>
                </svg>
            </span>
            </div>
            <div id="schedule"></div>
            <div id="loadingIndicator">

                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>

            </div>
            <div id="dayChangeRight" class="day-changer noselect" onclick="changeDay(1)">
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
    </div></div>
<?php if ($_GET['show-welcome'] == 'true' || true) { ?>
    <div id="redirect-welcome-layout" onclick="closeWelcome()">
        <div class="welcome-container" onclick="event.stopPropagation()">
            <div class="welcome-title">Välkommen till schema.vgy.se!</div>
            <a target="_blank" href="https://www.youtube.com/watch?v=uAWubRM14iY" class="welcome-gif">
                <video poster="http://i.imgur.com/xesp51xh.jpg" preload="auto" autoplay="autoplay" muted="muted"
                       loop="loop" webkit-playsinline="" style="width: 333px; height: 333px;">
                    <source src="http://i.imgur.com/xesp51x.webm" type="video/webm">
                    <source src="http://i.imgur.com/xesp51x.mp4" type="video/mp4">
                </video>
            </a>

            <div class="welcome-text">Schemavisaren har flyttat från vgy.rocks till den lite mer officiella
                schema.vgy.se! Glöm inte att byta ut alla eventuella bokmärken eftersom den gamla sidan kommer att
                stängas ned under de kommande månaderna. För att fira flytten har John poppat en Cava(?systemetlänk
                här?) vilket ni kan se på viden till höger.
            </div>
            <div class="clearfix"></div>
            <div class="welcome-close" onclick="closeWelcome()">Jag förstår men bryr mig inte</div>
        </div>
    </div>

<?php } ?>

</div>

<!--NOW

<div id="now-layout">

    <div id="nowTime" class="now-time"></div>

    <div id="nowSectionHolder">





        <div class="now-header">NUVARANDE LEKTION:</div>

        <div id="nowTimeRemaining">1 tim 6 min återstår av:</div>

        <div class="now-multiple-lessons-container">
            <div class="now-arrow-left now-arrow">
                <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                    <path d="M0-.5h24v24H0z" fill="none"/>
                </svg>
            </div>

            <div class="now-lesson-container">
                <div class="now-lesson-info">
                    <div class="now-lesson-info-title">Svenska 3</div>
                    <div class="now-lesson-info-subtitle">C111<br>Anna Häll</div>
                </div>

                <div class="now-lesson-times">
                    <div class="now-lesson-time now-lesson-start">9:30</div>
                    <div class="now-lesson-time now-lesson-end">11:00</div>
                </div>
            </div>

            <div class="now-arrow-right now-arrow">
                <svg id="dayChangeRightIcon" class="schedule-day-arrow" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    <path d="M0-.25h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div>


        <div class="now-header now-next">NÄSTA LEKTION:</div>
        <div class="clearfix"></div>

        <div class="now-multiple-lessons-container">
            <div class="now-arrow-left">
                <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                    <path d="M0-.5h24v24H0z" fill="none"/>
                </svg>
            </div>
            <div class="now-arrow-right">
                <svg id="dayChangeRightIcon" class="schedule-day-arrow" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    <path d="M0-.25h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div>

        <div id="nowNextLessonContainer" class="now-lesson-container">

            <div class="now-lesson-info">

                <div class="now-lesson-info-title">Matematik 5</div>
                <div class="now-lesson-info-subtitle">A22<br>Andreas Engström</div>
            </div>

            <div class="now-lesson-times">
                <div class="now-lesson-time now-lesson-start">13:30</div>
                <div class="now-lesson-time now-lesson-end">14:00</div>
            </div>

        </div>






    </div>

    <div class="now-nextbig-layout">

        <div class="now-nextbig-container" id="nextBigLunch">
            <div class="now-nextbig-text">Lunch om 2 lektioner</div>
            <div class="now-nextbig-time">12:10</div>
            <div class="clearfix"></div>
        </div>

        <div class="now-nextbig-container" id="nextBigEnd">
            <div class="now-nextbig-text">3 lektioner kvar på dagen</div>
            <div class="now-nextbig-time">14:30</div>
            <div class="clearfix"></div>
        </div>

    </div>


</div>

-->

<?php

include_script("js/lib.js");
include_script("js/util.js");
include_script("js/schedule.js");
include_script("js/view.js");
//NOW include_script("js/now.js");
include_script("js/script.js");

?>
<!--
<script type="text/javascript" src="js/lib.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript" src="js/schedule.js"></script>
<script type="text/javascript" src="js/view.js"></script>
<script type="text/javascript" src="js/now.js"></script>
<script type="text/javascript" src="js/script.js"></script>
-->
</body>
</html>
