<?php

function include_script($path) {
    echo "<script>";
    echo "\n";
    echo file_get_contents($path);
    echo "\n";
    echo "</script>";
    echo "\n";
}

function include_style($path) {
    echo "<style>";
    echo "\n";
    echo file_get_contents($path);
    echo "\n";
    echo "</style>";
    echo "\n";
}