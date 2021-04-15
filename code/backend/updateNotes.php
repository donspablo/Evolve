<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    sleep(5);
    //storing params into variables
    //current datetime
    date_default_timezone_set('Asia/Calcutta');
    $date = date('Y-m-d H:i:s');

    $userid = $data->uid;
    $notes = $data->note;

    // *Edit existing note
    try {
        //prepared statements
        $editnote = $conn->prepare("UPDATE notes SET user_notes=?, updated_at=? WHERE userID=?");

        $editnote->bind_param("ssi", $notes, $date, $userid);

        if ($editnote->execute()) {
            //setting http response code
            http_response_code(200);

            echo json_encode(["msg" => "Edited Note!"]);
        } else {
            //setting http response code
            http_response_code(500);
            echo json_encode(["error" => $conn->error]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => "Some error occurred! Please try again!"]);
    }
} else {
    //setting http response code
    http_response_code(400);
}
