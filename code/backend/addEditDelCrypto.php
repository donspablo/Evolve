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

        // *Insert new crypto
        try {
            //prepared statements
            $newcrypto = $conn->prepare("INSERT into crypto_transactions (userID, symbol, crypto_description, quantity, purchase_date, purchase_price, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)");

            $newcrypto->bind_param("issisdss", $userid, $symbol, $desc, $quantity, $purchaseDate, $purchasePrice, $date, $date);

            if ($newcrypto->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Added Crypto!"]);
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

        $tid = $data->cryptoTransactionID;

        // *Edit existing crypto
        try {
            //prepared statements
            $editcrypto = $conn->prepare("UPDATE crypto_transactions SET symbol=?, crypto_description=?, quantity=?, purchase_date=?, purchase_price=?, updated_at=? WHERE crypto_transaction_ID=?");

            $editcrypto->bind_param("ssisdsi", $symbol, $desc, $quantity, $purchaseDate, $purchasePrice, $date, $tid);

            if ($editcrypto->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Edited Crypto!"]);
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

        $tid = $data->cryptoTransactionID;

        // *Delete crypto
        try {
            //prepared statements
            $delcrypto = $conn->prepare("DELETE from crypto_transactions WHERE crypto_transaction_ID=?");

            $delcrypto->bind_param("i",  $tid);

            if ($delcrypto->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Deleted Crypto!"]);
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
