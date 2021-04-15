<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/auth.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $userid = $data->userid;
    $name = $data->name;

    $auth = new Auth();
  
    if($auth->verifyToken($userid, $name)){
        echo json_encode(array("verified" => "true"));
    }else{
        echo json_encode(array("verified" => "false"));
    }

}

?>