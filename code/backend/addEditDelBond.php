<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $type = $data->type; //1 -> add, 2 -> edit, 3 -> delete
    $bondtype = $data->bondtype;
    $desc = $data->desc;
    $faceValue = $data->faceValue;
    $purchaseDate = $data->purchaseDate;
    $couponRate = $data->couponRate;
    $paymentInterval = $data->paymentInterval;
    $ytm = $data->yearsToMaturity;

    //current datetime
    date_default_timezone_set('Asia/Calcutta');
    $date = date('Y-m-d H:i:s');

    sleep(5); // !for testing purposes

    if ($type == 1) {

        $userid = $data->uid;

        // *Insert new bond
        try {
            //prepared statements
            $newbond = $conn->prepare("INSERT into bond_transactions (userID, bond_type, bond_description, face_value, purchase_date, coupon_rate, years_to_maturity, payment_interval, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)");

            $newbond->bind_param("issdsddsss", $userid, $bondtype, $desc, $faceValue, $purchaseDate, $couponRate, $ytm, $paymentInterval, $date, $date);

            if ($newbond->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Added Bond!"]);
            } else {
                //setting http response code
                http_response_code(500);
                echo json_encode(["error" => $conn->error]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Some error occurred! Please try again!"]);
        }
    } else if ($type == 2) {

        $tid = $data->bondTransactionID;

        // *Edit existing bond
        try {
            //prepared statements
            $editbond = $conn->prepare("UPDATE bond_transactions SET bond_type=?, bond_description=?, face_value=?, purchase_date=?, coupon_rate=?, years_to_maturity=?, payment_interval=?, updated_at=? WHERE bond_transaction_ID=?");

            $editbond->bind_param("ssdsddssi", $bondtype, $desc, $faceValue, $purchaseDate, $couponRate, $ytm, $paymentInterval, $date, $tid);

            if ($editbond->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Edited Bond!"]);
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

        $tid = $data->bondTransactionID;

        // *Delete bond
        try {
            //prepared statements
            $delbond = $conn->prepare("DELETE from bond_transactions WHERE bond_transaction_ID=?");

            $delbond->bind_param("i",  $tid);

            if ($delbond->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Deleted Bond!"]);
            } else {
                //setting http response code
                http_response_code(500);
                echo json_encode(["error" => $conn->error]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Some error occurred! Please try again!"]);
        }
    }
} else {
    //setting http response code
    http_response_code(400);
}
