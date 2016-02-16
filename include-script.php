<?php

function include_script($path) {
    echo "<script>";
    echo file_get_contents($path);
    echo "</script>";
}