<?php

$server = "localhost";
$username = "root";
$password = "root";
$database = "evolve";

//Turn off error reporting
//error_reporting(0);

try {
    $conn = new mysqli($server, $username, $password, $database);
} catch (Exception $e) {
    //if connection is not successful
    
    //$error = json_encode(["Error" => "Cannot connect to the database!"]);
    //throw new Exception($error);
    //echo $error;
    echo $e;
    exit;
}

// else{
//     $message = json_encode(["Success" => "Connected Succssfully!"]);
//     mysqli_set_charset($conn,"utf8");
//     echo $message;
// }
