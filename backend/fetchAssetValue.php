<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $uid = $data->uid;

    $stmt = "SELECT totalassetval FROM user WHERE userID=".$uid." LIMIT 1";

    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {
            echo json_encode(['totalAssetVal' => $row['totalassetval']]);
        }
    }
}
