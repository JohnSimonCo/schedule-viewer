<?php

header('Access-Control-Allow-Credentials', true);

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost");
header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    //Respond to preflight request https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests
    http_response_code(204);
    exit(204);
}