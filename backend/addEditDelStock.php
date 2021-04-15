<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $type = $data->type; //1 -> add, 2 -> edit, 3 -> delete
    $symbol = $data->symbol;
    $desc = $data->desc;
    $quantity = $data->quantity;
    $purchaseDate = $data->purchaseDate;
    $purchasePrice = $data->purchasePrice;

    //current datetime
    date_default_timezone_set('Asia/Calcutta');
    $date = date('Y-m-d H:i:s');

    sleep(5); // !for testing purposes

    if ($type == 1) {

        $userid = $data->uid;

        // *Insert new stock
        try {
            //prepared statements
            $newstock = $conn->prepare("INSERT into stock_transactions (userID, symbol, stock_description, quantity, purchase_date, purchase_price, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)");

            $newstock->bind_param("issisdss", $userid, $symbol, $desc, $quantity, $purchaseDate, $purchasePrice, $date, $date);

            if ($newstock->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Added Stock!"]);
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

        $tid = $data->stockTransactionID;

        // *Edit existing stock
        try {
            //prepared statements
            $editstock = $conn->prepare("UPDATE stock_transactions SET symbol=?, stock_description=?, quantity=?, purchase_date=?, purchase_price=?, updated_at=? WHERE stock_transaction_ID=?");

            $editstock->bind_param("ssisdsi", $symbol, $desc, $quantity, $purchaseDate, $purchasePrice, $date, $tid);

            if ($editstock->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Edited Stock!"]);
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

        $tid = $data->stockTransactionID;

        // *Delete stock
        try {
            //prepared statements
            $delstock = $conn->prepare("DELETE from stock_transactions WHERE stock_transaction_ID=?");

            $delstock->bind_param("i",  $tid);

            if ($delstock->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Deleted Stock!"]);
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
