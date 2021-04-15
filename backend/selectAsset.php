<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    //storing params into variables
    $type = $data->assettype; //1 -> stock, 2 -> crypto, 3 -> bond, 4 -> others
    $uid = $data->uid;

    sleep(5); // !for testing purposes

    if ($type == 1) {

        // *Stocks
        $stmt = "SELECT * from stock_transactions WHERE userID='" . $uid . "' ORDER BY purchase_date DESC";

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
    } else if ($type == 2) {
        // *Cryptocurrencies
        $stmt = "SELECT * from crypto_transactions WHERE userID='" . $uid . "' ORDER BY purchase_date DESC";

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
    } else if ($type == 3) {

        // *Bonds
        $stmt = "SELECT * from bond_transactions WHERE userID='" . $uid . "' ORDER BY purchase_date DESC";

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
    } else if ($type == 4) {

        // *Other Assets
        $stmt = "SELECT * from other_assets_transactions WHERE userID='" . $uid . "' ORDER BY purchase_date DESC";

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
    }
}
