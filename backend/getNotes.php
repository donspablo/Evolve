<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $uid = $data->uid;

    $stmt = "SELECT user_notes from notes WHERE userID='" . $uid . "'";

    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {

        $res = array();
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            //pushes elements into array
            array_push($res, $row);
        }

        echo json_encode($res);
    } else {
        echo json_encode(["msg" => "No records found!"]);
    }
} else {
    //setting http response code
    http_response_code(400);
}

