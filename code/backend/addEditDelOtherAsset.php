<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $type = $data->type; //1 -> add, 2 -> edit, 3 -> delete
    $assetType = $data->assetType;
    $desc = $data->desc;
    $annualReturn = $data->annualReturn;
    $purchaseDate = $data->purchaseDate;
    $purchasePrice = $data->purchasePrice;

    //current datetime
    date_default_timezone_set('Asia/Calcutta');
    $date = date('Y-m-d H:i:s');

    if ($type == 1) {

        $userid = $data->uid;

        // *Insert new asset
        try {
            //prepared statements
            $newasset = $conn->prepare("INSERT into other_assets_transactions (userID, asset_type, asset_description, annual_return, purchase_date, purchase_price, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)");

            $newasset->bind_param("issdsdss", $userid, $assetType, $desc, $annualReturn, $purchaseDate, $purchasePrice, $date, $date);

            if ($newasset->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Added Asset!"]);
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

        $tid = $data->otherAssetTransactionID;

        // *Edit existing asset
        try {
            //prepared statements
            $editasset = $conn->prepare("UPDATE other_assets_transactions SET asset_type=?, asset_description=?, annual_return=?, purchase_date=?, purchase_price=?, updated_at=? WHERE other_assets_transaction_ID=?");

            $editasset->bind_param("ssdsdsi", $assetType, $desc, $annualReturn, $purchaseDate, $purchasePrice, $date, $tid);

            if ($editasset->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Edited Asset!"]);
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

        $tid = $data->otherAssetTransactionID;

        // *Delete asset
        try {
            //prepared statements
            $delasset = $conn->prepare("DELETE from other_assets_transactions WHERE other_assets_transaction_ID=?");

            $delasset->bind_param("i",  $tid);

            if ($delasset->execute()) {
                //setting http response code
                http_response_code(200);

                echo json_encode(["msg" => "Deleted Asset!"]);
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
