<?php
//headers
include_once("./headers.php");

include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/evolve/auth.php');

//decoding JSON body (POST request)
$data = json_decode(file_get_contents("php://input"));

if ($data) {

    try {
        //storing params into variables
        $email = $data->email;
        $password = md5($data->password);

        //prepared statements
        $stmt = $conn->prepare("SELECT userID,first_name,last_name,dp_loc,email FROM user WHERE email=? AND password=? LIMIT 1");

        $stmt->bind_param("ss", $email, $password);

        //executing the statement
        $stmt->execute();

        //getting result
        $result = $stmt->get_result();

        //setting http response code
        http_response_code(200);


        if ($row = mysqli_fetch_assoc($result)) {
            $auth = new Auth();
            $token = $auth->generateToken($row['userID'], $row['first_name']);
            echo json_encode(['userID' => $row['userID'], 'userData' => $token]);
        } else {
            echo json_encode(["error" => "Invalid Credentials!"]);
        }
    } catch (Exception $e) {
        http_response_code(404);
        echo json_encode(["error" => "Some error occurred! Please try again!"]);
    }
} else {
    echo json_encode(["error" => "Fill in all the details!"]);
}

//closing db connection
$conn->close();
